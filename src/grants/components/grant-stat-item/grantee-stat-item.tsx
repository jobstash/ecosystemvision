import React from 'react';

import { Skeleton } from '@nextui-org/react';

import { cn } from '@/shared/utils/cn';

import { GranteeProjectStat } from '@/grants/core/schemas';

interface Props {
  granteeStat: GranteeProjectStat;
  level?: number;
}

export const GranteeStatItem = ({ granteeStat, level = 1 }: Props) => {
  const { label, value, stats } = granteeStat;
  const hasChildren = !!stats && stats.length > 0;
  const hasGap = hasChildren || level === 1;

  return (
    <Container hasGap={hasGap} hasChildren={hasChildren}>
      <Inner hasChildren={hasChildren}>
        <span className="text-13 font-medium leading-tight text-white md:text-2xl md:text-white/60">
          {label}
        </span>
        <span className="text-xl font-medium">{trimStat(value)}</span>
      </Inner>

      {hasChildren && (
        <div className="-mx-1.5 flex flex-wrap gap-y-4 pt-2">
          {stats.map((stat) => (
            <GranteeStatItem
              key={stat.label}
              granteeStat={stat}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

interface WrapperProps {
  hasChildren: boolean;
  children: React.ReactNode;
}

export const Container = ({
  hasGap,
  hasChildren,
  children,
}: { hasGap: boolean } & WrapperProps) => (
  <div
    className={cn(' w-1/2 gap-6 px-1.5 ', {
      'w-full': hasChildren,
    })}
  >
    <div
      className={cn(
        'flex  flex-col gap-y-4 rounded-20 bg-gradient-to-r from-gradient-1/25 to-gradient-2/0 p-4 lg:bg-white/10 lg:bg-none',
        {
          'min-h-[130px]': hasGap,
          'min-h-[90px]': !hasGap,
        },
      )}
    >
      {children}
    </div>
  </div>
);

export const Inner = ({ hasChildren, children }: WrapperProps) => (
  <div
    className={cn('flex grow  justify-between', {
      'flex-row items-start': hasChildren,
      'flex-col': !hasChildren,
    })}
  >
    {children}
  </div>
);

const GranteeStatItemSkeleton = ({
  level = 1,
  children = null,
}: {
  level?: number;
  children?: React.ReactNode;
}) => {
  const hasChildren = children !== null;
  const hasGap = level === 1;
  return (
    <Container hasChildren={hasChildren} hasGap={hasGap}>
      <Inner hasChildren={hasChildren}>
        <Skeleton className="size-full rounded-20" />
      </Inner>
      {children}
    </Container>
  );
};

export const GranteeStatsSkeleton = () => (
  <>
    <GranteeStatItemSkeleton />
    <GranteeStatItemSkeleton />
    <GranteeStatItemSkeleton>
      <GranteeStatItemSkeleton />
    </GranteeStatItemSkeleton>
    <GranteeStatItemSkeleton />
    <GranteeStatItemSkeleton />
  </>
);

export const trimStat = (input: string): string => {
  const num = parseFloat(input);

  if (!isNaN(num)) {
    return num.toFixed(2);
  }

  return input;
};
