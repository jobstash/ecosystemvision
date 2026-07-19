import type { Metadata } from 'next';

import { FRONTEND_URL } from '@/shared/core/envs';

import { FundList } from '@/funds/components/fund-list';

const FundsPage = () => (
  <main className="glow-gradient min-h-screen px-4 pb-12 pt-24 md:px-8 lg:pt-12">
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold text-white">Funds</h1>
        <p className="max-w-2xl text-white/65">
          Explore crypto funds and the teams and portfolio companies connected
          to them across the JobStash dataset.
        </p>
      </header>
      <FundList />
    </div>
  </main>
);

export default FundsPage;

export const metadata: Metadata = {
  title: 'Funds | Ecosystem Vision',
  alternates: { canonical: `${FRONTEND_URL}/funds` },
};
