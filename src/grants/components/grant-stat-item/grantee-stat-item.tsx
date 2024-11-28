import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';

import { cn } from '@/shared/utils/cn';
import { copyToClipboard } from '@/shared/utils/copy-to-clipboard';

import { GranteeProjectStat } from '@/grants/core/schemas';

interface Props {
  granteeStat: GranteeProjectStat;
  level?: number;
}

export const GranteeStatItem = ({ granteeStat, level = 1 }: Props) => {
  const { label, value, stats } = granteeStat;
  const hasChildren = !!stats && stats.length > 0;
  const hasGap = hasChildren || level === 1;

  const text = formatStat(value);

  const onCopy = () => {
    copyToClipboard({ text: value, options: { icon: '✅' } });
  };

  return (
    <Container hasGap={hasGap} hasChildren={hasChildren}>
      <Inner hasChildren={hasChildren}>
        <span className="text-13 font-medium leading-tight text-white md:text-2xl md:text-white/60">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xl font-medium" onClick={onCopy}>
            {text}
          </span>
          {text.includes('...') && (
            <Button isIconOnly size="sm" onClick={onCopy}>
              <CopyIcon />
            </Button>
          )}
        </div>
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
        'flex  flex-col rounded-20 bg-gradient-to-r from-gradient-1/25 to-gradient-2/0 p-4 lg:bg-white/10 lg:bg-none',
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

// Regular expression to match a valid number (integer, float, or scientific notation)
const NUM_REGEX = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

export const formatStat = (input: string): string => {
  const trimmed = input.trim();

  if (NUM_REGEX.test(trimmed)) {
    const num = parseFloat(trimmed);
    return num.toFixed(2);
  }

  if (trimmed.startsWith('0x')) {
    return `${trimmed.slice(0, 6)}... ${trimmed.slice(-4)}`;
  }

  return input;
};

const CopyIcon = () => (
  <svg
    data-slot="icon"
    data-darkreader-inline-stroke=""
    fill="none"
    strokeWidth="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="size-5 text-white/60"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    ></path>
  </svg>
);
