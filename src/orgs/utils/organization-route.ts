// Names are not unique. Carry the existing organization ID in new detail links.
export const organizationRouteKey = (org: {
  normalizedName: string;
  orgId?: string | null;
}) => (org.orgId ? `${org.normalizedName}~${org.orgId}` : org.normalizedName);

export const organizationDetailsPath = (key: string) => {
  const match = key.match(/~([a-zA-Z0-9-]+)$/);
  return match
    ? `/organizations/details/${encodeURIComponent(match[1])}`
    : `/organizations/details/slug/${encodeURIComponent(key)}`;
};
