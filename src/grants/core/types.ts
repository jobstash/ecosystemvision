export interface Grantee {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  summary: string;
  url: string | null;
  lastFunding: number;
  fundingDate: number;
}

export interface Grant {
  id: string;
  name: string;
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
  grantees: Grantee[];
}
