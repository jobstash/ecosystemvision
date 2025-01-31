export const ROUTE_SECTIONS = {
  SEARCH: 'search' as const,
  ORGS: 'organizations' as const,
  PROJECTS: 'projects' as const,
  GRANTS: 'grants' as const,
  IMPACT: 'impact' as const,
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
  IMPACT_PAGE: `/${ROUTE_SECTIONS.IMPACT}`,
  GRANTS_PAGE: `/${ROUTE_SECTIONS.GRANTS}`,
} as const;

export const A11Y = {
  LINK: {
    BACK: 'Back',
    NAV: {
      SEARCH: 'Search',
      HOME: 'Home',
      ORGS: 'Organizations',
      PROJECTS: 'Projects',
      IMPACT: 'Impact',
      GRANTS: 'Grants',
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

export const MAX_LIST_SIZE = 5000;

export const GA_EVENT = {
  GRANTS: {
    APPLY_ACTIVE_GRANT: 'apply-active-grant', // value: grant slug
    APPLY_AI_ACTIVE_GRANT: 'apply-ai-active-grant', // value: grant slug
    VIEW_PROGRAM: 'grant-view-program', // value: program slug
    VIEW_IMPACT: 'grant-view-impact', // value: grant slug
    AI_GRANT_PROGRAM_FINDER_SUBMIT: 'ai-grant-program-finder-submit', // value: program name
    GRANT_ITEM_CLICK: 'grant-item-click', // value: grant slug
    GRANTEE_ITEM_CLICK: 'grantee-item-click', // value: grantee id
    GRANTEE_PROJECT_SELECTION: 'grantee-project-selection', // value: project id
    GRANTEE_PROJECT_TAB_SELECTION: 'grantee-project-tab-selection', // value: `${project name}-${tab name}`
  },
};
