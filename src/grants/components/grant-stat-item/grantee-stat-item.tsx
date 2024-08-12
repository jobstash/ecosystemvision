import { cn } from '@/shared/utils/cn';

import { GranteeProjectStat } from '@/grants/core/schemas';

interface Props {
  granteeStat: GranteeProjectStat;
  level?: number;
}

export const GranteeStatItem = ({ granteeStat, level = 1 }: Props) => {
  const { label, value, stats } = granteeStat;
  const hasChildren = stats && stats.length > 0;
  const hasGap = hasChildren || level === 1;

  return (
    <div
      className={cn('flex gap-6 rounded-[20px] bg-white/5 p-5', {
        ' [&>*]:min-h-36': hasGap,
      })}
    >
      <div
        className={cn('flex min-h-max min-w-64 flex-col', {
          'justify-between': hasGap,
          'justify-center': !hasGap,
        })}
      >
        <div>
          <span className="text-2xl font-bold text-white/60">{label}</span>
        </div>
        <div>
          <span className="text-3xl font-bold">{value}</span>
        </div>
      </div>

      {hasChildren && (
        <>
          {stats.map((stat) => (
            <GranteeStatItem
              key={stat.label}
              granteeStat={stat}
              level={level + 1}
            />
          ))}
        </>
      )}
    </div>
  );
};
