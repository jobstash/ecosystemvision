import {
  PeopleActivityMap,
  PeopleAtlas,
  PeopleOverview,
} from '@/people/core/schemas';

export const PUBLIC_AGGREGATE_K = 5;

export const suppressPublicCount = (value: number | null): number | null =>
  value === null || (value !== 0 && Math.abs(value) < PUBLIC_AGGREGATE_K)
    ? null
    : value;

export const suppressPeopleOverview = (overview: PeopleOverview): PeopleOverview => ({
  ...overview,
  points: overview.points.map((point) => ({
    ...point,
    activePeople: suppressPublicCount(point.activePeople),
    activeMaintainers: suppressPublicCount(point.activeMaintainers),
    activeLeads: suppressPublicCount(point.activeLeads),
    activeOrganizations: suppressPublicCount(point.activeOrganizations),
    joins: suppressPublicCount(point.joins),
    exits: suppressPublicCount(point.exits),
    returns: suppressPublicCount(point.returns),
    movements: suppressPublicCount(point.movements),
    activityCount: suppressPublicCount(point.activityCount),
    commitCount: suppressPublicCount(point.commitCount),
    mergeCount: suppressPublicCount(point.mergeCount),
  })),
});

export const suppressPeopleActivityMap = (
  activityMap: PeopleActivityMap,
): PeopleActivityMap => ({
  ...activityMap,
  rows: activityMap.rows.map((row) => ({
    ...row,
    currentValue: suppressPublicCount(row.currentValue),
    change: suppressPublicCount(row.change),
    totalValue: suppressPublicCount(row.totalValue),
    series: row.series.map((point) => ({
      ...point,
      value: suppressPublicCount(point.value),
    })),
  })),
});

export const suppressPeopleAtlas = (atlas: PeopleAtlas): PeopleAtlas => {
  const flows = atlas.flows
    .filter(({ people }) => people >= PUBLIC_AGGREGATE_K)
    .map((flow) => ({
      ...flow,
      maintainerMovements: suppressPublicCount(flow.maintainerMovements),
    }));

  return {
    ...atlas,
    totalMovements: suppressPublicCount(atlas.totalMovements),
    visibleMovements: suppressPublicCount(atlas.visibleMovements),
    organizations: atlas.organizations.map((organization) => ({
      ...organization,
      activePeople: suppressPublicCount(organization.activePeople),
      activeMaintainers: suppressPublicCount(organization.activeMaintainers),
      series: organization.series.map((point) => ({
        ...point,
        activePeople: suppressPublicCount(point.activePeople),
        activeMaintainers: suppressPublicCount(point.activeMaintainers),
      })),
    })),
    flows,
  };
};
