export interface LineItem {
  group: string;
  amount: number;
  percentage: number;
  isActive: boolean;
  title: string;
  raised: string;
  info?: string;
  date?: string;
  tokenAmount?: number | null;
}
