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
