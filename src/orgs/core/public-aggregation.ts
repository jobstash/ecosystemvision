import { OrganizationIntelligence } from './schemas';

const publicCount = (value: number | null) =>
  value !== null && value > 0 && value < 5 ? null : value;

export const suppressOrganizationIntelligence = <
  T extends OrganizationIntelligence,
>(
  organization: T,
): T => ({
  ...organization,
  currentMaintainerCount: publicCount(organization.currentMaintainerCount),
  activeLeadCount: publicCount(organization.activeLeadCount),
  newActiveLeadCount: publicCount(organization.newActiveLeadCount),
  steppedDownLeadCount: publicCount(organization.steppedDownLeadCount),
  movedLeadCount: publicCount(organization.movedLeadCount),
  earlyLeadDepartureCount: publicCount(organization.earlyLeadDepartureCount),
});
