const NAV_MAP = {
  'active-grants': 'grants',
  'grants-impact': 'grantsImpact',
};
const KEYS = new Set(Object.keys(NAV_MAP));

export const getMappedNavParam = (nav: string) => {
  if (KEYS.has(nav)) {
    return NAV_MAP[nav as keyof typeof NAV_MAP];
  }
  return nav;
};
