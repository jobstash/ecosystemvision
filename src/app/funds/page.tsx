import type { Metadata } from 'next';

import { FRONTEND_URL } from '@/shared/core/envs';
import { AppHeader } from '@/shared/components/app-header';

import { FundFilters } from '@/funds/components/fund-filters';
import { FundList } from '@/funds/components/fund-list';

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const FundsPage = async ({ searchParams }: Props) => {
  const rawSearchParams = await searchParams;
  const listSearchParams = { ...rawSearchParams };

  // Older shared URLs may still contain the round-size-based capital filters.
  // Ignore them now that only disclosed fund-specific investments are valid.
  delete listSearchParams.minInvestedCapital;
  if (listSearchParams.orderBy === 'totalInvestedCapital') {
    delete listSearchParams.orderBy;
  }

  return (
    <main className="min-h-screen bg-[#070708]">
      <AppHeader />
      <section className="glow-gradient px-4 pb-8 pt-[154px] lg:px-8">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-bold md:text-3xl">Funds</h1>
          <p className="text-sm text-white/70 lg:text-base">
            Compare crypto funds by activity, portfolio progression, sector mix,
            disclosed round capital, team profiles, and open roles. Round
            capital is kept separate from each fund&apos;s undisclosed check size.
          </p>
        </div>
      </section>
      <section className="p-4 lg:px-8">
        <FundFilters />
      </section>
      <FundList searchParams={listSearchParams} />
    </main>
  );
};

export default FundsPage;

export const metadata: Metadata = {
  title: 'Funds | Ecosystem Vision',
  alternates: { canonical: `${FRONTEND_URL}/funds` },
};
