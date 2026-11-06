// Explicitly synthetic local browser fixtures. Never imported by application code.
const http = require('node:http');
const { organization: baseOrganization } = require('./sentry-responses');
const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const chain = { id: id(1), name: 'Fixture Chain', normalizedName: 'fixture-chain', logo: null };
const project = {
  id: id(2), name: 'Fixture Protocol', normalizedName: 'fixture-protocol',
  website: null, logo: null, chains: [chain], hacks: [], audits: [],
  summary: 'Synthetic protocol for local interface verification.',
  description: 'Local synthetic data, not a production project.',
  category: 'Infrastructure', tvl: 2500000, monthlyRevenue: 12000,
  monthlyVolume: 500000, monthlyFees: 14000, monthlyActiveUsers: 100,
  discord: null, telegram: null, github: null, docs: null, twitter: null,
};
const organization = {
  ...baseOrganization, name: 'Fixture Organization', normalizedName: 'fixture-organization',
  summary: 'Synthetic organization for local browser verification.', projects: [project],
  headcountEstimate: 12,
};
const orgListItem = {
  ...organization, url: null, projectCount: 1, lastFundingDate: 1700000000000,
  lastFundingAmount: 1000000, ecosystems: ['Fixture Chain'],
};
const fund = {
  id: id(3), name: 'Fixture Capital', normalizedName: 'fixture-capital',
  logoUrl: null, website: null, twitter: null, staffCount: 0, socialStaffCount: 0,
  portfolioCount: 1, totalInvestedCapital: null, knownRoundCapital: 1000000,
  knownRoundCount: 1, valuationRoundCount: 0, investmentRoundCount: 1,
  ambiguousRoundCount: 0, soloRoundCount: 1, syndicatedRoundCount: 0, soloRate: 100,
  progressedCompanyCount: 0, progressionRate: null, stageProgressedCompanyCount: 0,
  stageTrackedCompanyCount: 1, stageProgressionRate: 0, followOnRoundCapital: null,
  medianRoundSizeStepUp: null, roundSizeStepUpSample: 0, medianValuationStepUp: null,
  valuationStepUpSample: 0, topSectors: [{ name: 'Infrastructure', companyCount: 1 }],
  lastInvestmentDate: 1700000000000, jobCount: 0, activityWindow: 'all',
  activityFromDate: null, activityToDate: 1793923200, roundStages: ['seed'],
  summary: 'Synthetic fund for local browser verification.',
  description: 'Local synthetic data, not a production investor.', location: 'Distributed',
  team: [], jobs: [], investments: [{
    organizationId: organization.orgId, name: organization.name,
    normalizedName: organization.normalizedName, summary: organization.summary,
    logoUrl: null, website: null, vertical: 'Infrastructure', sectors: ['Infrastructure'],
    rounds: [{ id: id(4), roundName: 'Seed', date: 1700000000000,
      raisedAmount: 1000000, investedAmount: null, valuation: null, investorCount: 1,
      fundParticipated: true, investmentRole: 'recorded-solo', sourceLink: null, source: null }],
  }],
};
const filter = (position, label, kind, extra) => ({ position, label, kind, show: true, googleAnalyticsEventName: 'local_fixture', ...extra });
const filters = [
  filter(1, 'Sort by', 'ORDER_BY', { paramKey: 'orderBy', options: [{ label: 'Name', value: 'name' }, { label: 'Funding', value: 'lastFundingAmount' }] }),
  filter(2, 'Order', 'ORDER', { paramKey: 'order', options: [{ label: 'Descending', value: 'desc' }, { label: 'Ascending', value: 'asc' }] }),
  filter(3, 'Location', 'MULTI_SELECT', { paramKey: 'locations', options: [{ label: 'Distributed', value: 'distributed' }, { label: 'Europe', value: 'europe' }] }),
  filter(4, 'Funding stage', 'SINGLE_SELECT', { paramKey: 'fundingStage', options: [{ label: 'Seed', value: 'seed' }, { label: 'Series A', value: 'series-a' }] }),
  filter(5, 'Headcount', 'RANGE', { min: { value: 0, paramKey: 'minHeadcount' }, max: { value: 1000, paramKey: 'maxHeadcount' }, prefix: null }),
  filter(6, 'Has jobs', 'SINGLE_SELECT', { paramKey: 'hasJobs', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] }),
];
const list = (data, url) => {
  const page = Number(url.searchParams.get('page') || 1);
  const items = page === 1 ? data : [];
  return { page, count: items.length, total: data.length, data: items };
};
const labels = ['Infrastructure', 'Analytics'];
const responseFor = (url) => {
  const route = url.pathname;
  if (route === '/health' || route === '/health/ready') return { status: 'ok', fixture: 'synthetic-browser' };
  if (route === '/sitemap') return { organizations: [], projects: [], funds: [] };
  if (route === '/search/pillar') {
    const item = url.searchParams.get('item');
    if (item === 'fixture-missing' || item === 'fixture-unavailable') return { success: true, message: 'Synthetic missing pillar', data: null };
    if (item === 'fixture-error') return { success: false, message: 'Synthetic upstream failure' };
    if (item === 'fixture-malformed') return { success: true, message: 'Synthetic malformed success', data: {} };
  }
  if (route === '/search/pillar') return { success: true, message: 'Synthetic local fixture', data: {
    title: url.searchParams.get('nav') === 'projects' ? 'Projects' : 'Organizations',
    description: 'Synthetic local verification dataset.',
    activePillar: { slug: 'categories', label: 'Categories', items: labels },
    altPillars: [{ slug: 'chains', label: 'Chains', items: ['Fixture Chain'] }],
  } };
  if (route === '/search/pillar/filters') return { success: true, message: 'Synthetic local filters', data: filters };
  if (route === '/search/pillar/items') {
    const items = url.searchParams.get('pillar') === 'chains' ? ['Fixture Chain'] : labels;
    return list(items.filter((label) => label.toLowerCase().includes((url.searchParams.get('query') || '').toLowerCase())), url);
  }
  if (route === '/search/pillar/labels') return { data: (url.searchParams.get('slugs') || '').split(',').filter(Boolean).map((slug) => ({ slug, label: slug.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ') })) };
  if (route === '/search') return { organizations: { names: [{ value: organization.name, link: '/organizations/info/fixture-organization~90001' }] }, projects: { categories: [{ value: 'Infrastructure', link: '/projects/categories/infrastructure' }] } };
  if (route === '/organizations/list') return list([orgListItem], url);
  if (route.startsWith('/organizations/details/')) return organization;
  if (route === '/projects/search') return list([project], url);
  if (route.startsWith('/projects/details/')) return { ...project, organizations: [{ ...organization, tags: [], investors: [], fundingRounds: [] }], grants: [], fundingRounds: [] };
  if (route === '/funds/list') return list([fund], url);
  if (route === '/funds/sectors') return fund.topSectors;
  if (route === '/funds/rounds') return [{ slug: 'seed', name: 'Seed', fundCount: 1, investmentCount: 1 }];
  if (route.startsWith('/funds/details/slug/')) return fund;
  return undefined;
};
const createServer = () => http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const data = responseFor(url);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'OPTIONS') { response.writeHead(204); response.end(); return; }
  response.writeHead(url.pathname === '/search/pillar' && url.searchParams.get('item') === 'fixture-unavailable' ? 503 : data === undefined ? 404 : 200);
  response.end(JSON.stringify(data === undefined ? { success: false, message: `No local fixture for ${url.pathname}` } : data));
});
if (require.main === module) {
  const port = Number(process.env.FIXTURE_PORT || 4321);
  createServer().listen(port, '0.0.0.0', () => console.log(`Synthetic browser API listening on ${port}`));
}
module.exports = { createServer, responseFor, organization, orgListItem, project, fund, filters };
