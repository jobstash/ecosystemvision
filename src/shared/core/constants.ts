export const ROUTE_SECTIONS = {
  JOBS: 'jobs' as const,
  ORGS: 'organizations' as const,
  PROJECTS: 'projects' as const,
} as const;
export type RouteSection = (typeof ROUTE_SECTIONS)[keyof typeof ROUTE_SECTIONS];

export const ROUTE_TABS = {
  SHARED: {
    DETAILS: 'details',
    ORG: 'organization',
  },
  JOBS: {
    PROJECTS: 'projects',
    COMPETITORS: 'competitors',
    OTHER_JOBS: 'other-jobs',
  },
  ORGS: {
    PROJECTS: 'projects',
    JOBS: 'jobs',
    REVIEWS: 'reviews',
  },
};

export const HREFS = {
  HOME_PAGE: '/',
  JOBS_PAGE: `/${ROUTE_SECTIONS.JOBS}`,
  ORGS_PAGE: `/${ROUTE_SECTIONS.ORGS}`,
  PROJECTS_PAGE: `/${ROUTE_SECTIONS.PROJECTS}`,
} as const;

export const A11Y = {
  LINK: {
    BACK: 'Back',
    SIDEBAR: {
      JOBS: 'Jobs',
      ORGS: 'Organizations',
      PROJECTS: 'Projects',
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
