const PERSON_PROFILE_PATH = /^\/people\/[^/]+\/?$/;
const ORGANIZATION_TEAM_PATH =
  /^\/organizations\/(?:info|names)\/[^/]+\/team\/?$/;

export const isRemovedIdentityPath = (pathname: string) =>
  PERSON_PROFILE_PATH.test(pathname) || ORGANIZATION_TEAM_PATH.test(pathname);

export const REMOVED_IDENTITY_BODY = 'This identity view has been removed.\n';

export const REMOVED_IDENTITY_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
  'Content-Type': 'text/plain; charset=utf-8',
  Expires: '0',
  Pragma: 'no-cache',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
} as const;
