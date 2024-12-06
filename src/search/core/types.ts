export interface PillarParams {
  pillar: string;
  item: string;
  pillar2?: string;
  item2?: string;
}

export interface GetPillarInfoProps extends PillarParams {
  nav: string;
  limit?: number;
}

export interface TPillarItem {
  label: string;
  href: string;
}

export type TPillarItemMap = Map<string, TPillarItem>;
