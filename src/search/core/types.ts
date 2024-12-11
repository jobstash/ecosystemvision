export interface PillarParams {
  pillar: string;
  item: string;
}

export type PillarSearchParams = Record<string, string> & {
  include?: string;
};

export type PillarSelections = Record<string, string[]>;

export interface GetPillarInfoProps extends PillarParams {
  nav: string;
  limit?: number;
}

export interface GetPillarItemsProps {
  nav: string;
  pillar: string;
  query: string;
  page?: number;
  limit?: number;
}

export interface TPillarItem {
  label: string;
  href: string;
  isActive: boolean;
}
