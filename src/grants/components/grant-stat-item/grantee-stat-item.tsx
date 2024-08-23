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
  const hasChildren = stats && stats.length > 0;
  const hasGap = hasChildren || level === 1;

  return (
    <Container hasGap={hasGap}>
      <Inner hasGap={hasGap}>
        <div>
          <span className="text-2xl font-bold text-white/60">{label}</span>
        </div>
        <div>
          <span className="text-3xl font-bold">{value}</span>
        </div>
      </Inner>

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
    </Container>
  );
};

interface WrapperProps {
  hasGap: boolean;
  children: React.ReactNode;
}

export const Container = ({ hasGap, children }: WrapperProps) => (
  <div
    className={cn('flex flex-wrap gap-6 rounded-[20px] bg-white/5 p-5', {
      ' [&>*]:min-h-36': hasGap,
    })}
  >
    {children}
  </div>
);

export const Inner = ({ hasGap, children }: WrapperProps) => (
  <div
    className={cn('flex min-h-max min-w-64 flex-col', {
      'justify-between': hasGap,
      'justify-center': !hasGap,
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
  const hasGap = level === 1;
  return (
    <Container hasGap={hasGap}>
      <Inner hasGap={hasGap}>
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
