import { GranteeCard } from '@/grants/components/grantee-card';
import { ProjectSelection } from '@/grants/components/project-selection';

interface Props {
  grantId: string;
  granteeId: string;
  children: React.ReactNode;
}

export const GranteePageLayout = ({ grantId, granteeId, children }: Props) => {
  return (
    <div className="flex w-max flex-col gap-8 lg:grow">
      <GranteeCard granteeId={granteeId} />
      <ProjectSelection grantId={grantId} granteeId={granteeId} />
      {children}
    </div>
  );
};
