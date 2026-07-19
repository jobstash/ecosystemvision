export const ROUTE_SECTIONS = {
  SEARCH: 'search' as const,
  ORGS: 'organizations' as const,
  PROJECTS: 'projects' as const,
  FUNDS: 'funds' as const,
} as const;
export type RouteSection = (typeof ROUTE_SECTIONS)[keyof typeof ROUTE_SECTIONS];

export const ROUTE_TABS = {
  SHARED: {
    DETAILS: 'details',
    ORG: 'organization',
  },
  ORGS: {
    PROJECTS: 'projects',
    REVIEWS: 'reviews',
  },
};

export const HREFS = {
  SEARCH_PAGE: `/${ROUTE_SECTIONS.SEARCH}`,
  HOME_PAGE: '/',
  ORGS_PAGE: `/${ROUTE_SECTIONS.ORGS}`,
  PROJECTS_PAGE: `/${ROUTE_SECTIONS.PROJECTS}`,
  FUNDS_PAGE: `/${ROUTE_SECTIONS.FUNDS}`,
} as const;

export const A11Y = {
  LINK: {
    BACK: 'Back',
    NAV: {
      SEARCH: 'Search',
      HOME: 'Home',
      ORGS: 'Organizations',
      PROJECTS: 'Projects',
      FUNDS: 'Funds',
    },
  },
} as const;

export const QUERY_STALETIME = {
  DEFAULT: 1000 * 60 * 60, // 1 hr
} as const;

export const JOB_SENIORITY_MAP = {
  Intern: '1',
  Junior: '2',
  Senior: '3',
  Lead: '4',
  Head: '5',
} as const;

export const JOB_SENIORITY_SET = new Set(Object.keys(JOB_SENIORITY_MAP));

export const TEST_IDS = {
  MOBILE_MENU: 'mobile-menu',
  DETAILS_BACK: 'details-back',
  NAV_SECTION: 'nav-section',
  DETAILS_PANEL_TABS: 'details-panel-tabs',
} as const;
