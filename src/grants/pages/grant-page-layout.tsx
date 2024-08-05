import { GrantBackButton } from '@/grants/components/grant-back-button';
import { GrantCard } from '@/grants/components/grant-card';

import { fakeGrant } from '@/grants/testutils/fake-grant';

interface Props {
  children: React.ReactNode;
  list: React.ReactNode;
  params: { grantId: string };
}

export const GrantPageLayout = ({
  children,
  list,
  params: { grantId },
}: Props) => {
  // TODO: fetch grant using grantId
  const grant = fakeGrant();

  return (
    <div className="flex flex-col gap-8 p-8">
      <GrantBackButton fallbackUrl="/grants" />

      <GrantCard grant={grant} />

      <span>{`Grantee List of grant#${grantId}`}</span>

      <div className="flex gap-8">
        <div className="w-full shrink-0 lg:w-4/12">{list}</div>

        {children}
      </div>
    </div>
  );
};
