import dynamic from 'next/dynamic';

import { HREFS } from '@/shared/core/constants';

import { Grant } from '@/grants/core/schemas';
import { GrantBackButton } from '@/grants/components/grant-back-button';

import { ScrollTriggerContainer } from '@/grants/pages/grant-page-layout/scroll-trigger-container';

const GrantCard = dynamic(
  () => import('@/grants/components/grant-card').then((m) => m.GrantCard),
  {
    ssr: true,
    loading: () => <p>TODO: GrantCard Skeleton</p>,
  },
);

interface Props {
  grant: Grant;
  list: React.ReactNode;
  children: React.ReactNode;
}

export const GrantPageLayout = ({ list, grant, children }: Props) => {
  return (
    <div className="flex flex-col gap-6 px-4 pt-[56px] md:pt-20 lg:px-0 lg:pt-0">
      <GrantCard
        grant={grant}
        backButton={<GrantBackButton fallbackUrl={HREFS.IMPACT_PAGE} />}
      />

      <div className="lg:pr-8">
        <div className="flex gap-8">
          <div className="w-full shrink-0 lg:w-4/12">{list}</div>
          <ScrollTriggerContainer>{children}</ScrollTriggerContainer>
        </div>
      </div>
    </div>
  );
};
