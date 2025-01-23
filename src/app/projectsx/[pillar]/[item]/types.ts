export interface LabeledItem {
  pillar: string;
  slug: string;
  label: string | undefined;
  href: string;
}

export interface PillarRowItem {
  label: string;
  href: string;
  isActive: boolean;
}

export interface GetPillarItemsProps {
  nav: string;
  pillar: string;
  query?: string;
  page?: number;
  limit?: number;
}
