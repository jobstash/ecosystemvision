export interface PillarParams {
  pillar: string | null;
  item: string | null;
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
  query?: string;
  page?: number;
  limit?: number;
}

export interface TPillarItem {
  slug: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface GetPillarInputLabelsProps {
  nav: string;
  pillars: string[];
  inputs: { slug: string; pillarSlug: string; href: string }[];
}

export interface InputPillarItem extends TPillarItem {
  pillarSlug: string;
}

export type PillarNav =
  | 'projects'
  | 'organizations'
  | 'grants'
  | 'grantsImpact'
  | 'vcs';
