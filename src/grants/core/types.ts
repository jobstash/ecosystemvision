export interface Grant {
  id: string;
  name: string;
  grantees: number;
  networks: { name: string; logo: string | null }[];
  ecosystem: string;
  totalFunds: number;
  totalDisbursedFunds: number;
  summary: string;
  categories: string[];
  type: string;
  reputations: string[];
  logo: string | null;
  url: string | null;
  twitter: string | null;
  discord: string | null;
}
