import type { Metadata } from 'next';

import { FRONTEND_URL } from '@/shared/core/envs';

import { getFundDetails } from '@/funds/data/get-fund-details';
import { FundDetails } from '@/funds/components/fund-details';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

const FundDetailsPage = async ({ params, searchParams }: Props) => {
  const [{ slug }, filters] = await Promise.all([params, searchParams]);
  const fund = await getFundDetails(slug, filters);
  const query = new URLSearchParams(filters).toString();
  return <FundDetails fund={fund} backHref={`/funds${query ? `?${query}` : ''}`} />;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const fund = await getFundDetails(slug);
  return {
    title: `${fund.name} | Funds | Ecosystem Vision`,
    description:
      fund.summary ??
      `Explore ${fund.name}'s team and portfolio investments on Ecosystem Vision.`,
    alternates: {
      canonical: `${FRONTEND_URL}/funds/${encodeURIComponent(slug)}`,
    },
  };
};

export default FundDetailsPage;
