import { Divider } from '@/shared/components/divider';

import { Grant } from '@/grants/core/schemas';
import { GrantBackButton } from '@/grants/components/grant-back-button';
import { GrantCard } from '@/grants/components/grant-card';

interface Props {
  grant: Grant;
  list: React.ReactNode;
  children: React.ReactNode;
}

export const GrantPageLayout = ({ children, list, grant }: Props) => {
  return (
    <div className="flex flex-col gap-6 p-8">
      <GrantBackButton fallbackUrl="/grants" />

      <GrantCard grant={grant} />

      <span>{`Grantee List of ${grant.name}`}</span>

      <Divider />

      <div className="flex gap-8">
        <div className="w-full shrink-0 lg:w-4/12">{list}</div>

        {children}
      </div>
    </div>
  );
};
