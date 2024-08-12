import { GranteeProjectStat } from '@/grants/core/schemas';
import { GranteeStatItem } from '@/grants/components/grant-stat-item';

interface Props {
  stats: GranteeProjectStat[];
}

export const GranteeProjectStats = ({ stats }: Props) => {
  return (
    <div className="flex flex-wrap gap-6">
      {stats.map((granteeStat) => (
        <GranteeStatItem key={granteeStat.label} granteeStat={granteeStat} />
      ))}
    </div>
  );
};
