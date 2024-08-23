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
      className={cn(' w-1/2 gap-6 px-1.5 ', {
        'w-full': hasChildren,
      })}
    >
      <div
        className={cn(
          'flex  flex-col rounded-20 bg-gradient-to-r from-gradient-1/25 to-gradient-2/0 p-4',
          {
            'min-h-[130px]': hasGap,
            'min-h-[90px]': !hasGap,
          },
        )}
      >
        <div
          className={cn('flex grow  justify-between', {
            'flex-row items-start': hasChildren,
            'flex-col': !hasChildren,
          })}
        >
          <span className="text-13 font-medium leading-tight text-white md:text-2xl">
            {label}
          </span>
          <span className="text-xl font-medium">{value}</span>
        </div>

        {hasChildren && (
          <div className="-mx-1.5 flex flex-wrap pt-2">
            {stats.map((stat) => (
              <GranteeStatItem
                key={stat.label}
                granteeStat={stat}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
