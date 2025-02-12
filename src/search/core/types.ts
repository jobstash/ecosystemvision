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
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  query?: string;
  page?: number;
  limit?: number;
}

export interface GetPillarInfoProps {
  nav: string;
  pillar: string | null;
  item: string | null;
  searchParams: Record<string, string>;
  limit?: number;
}

export interface GetPillarInputLabelsProps {
  nav: string;
  pillars: string[];
  inputs: { slug: string; pillarSlug: string; href: string }[];
}

export interface GetPillarFiltersProps {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
}
