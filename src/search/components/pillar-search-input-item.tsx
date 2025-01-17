'use client';

import { useRouter } from 'next/navigation';

import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

import { cn } from '@/shared/utils/cn';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  slug: string;
  label: string | null;
  href: string;
  pillarSlug: string;
}

export const PillarSearchInputItem = ({
  slug,
  label,
  href,
  pillarSlug,
}: Props) => {
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const router = useRouter();

  const onClose = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Tooltip
      content={
        !label ? <TooltipContent pillarSlug={pillarSlug} slug={slug} /> : null
      }
    >
      <Chip
        key={label}
        classNames={{
          base: cn('rounded-lg bg-white/10', {
            'border border-red-800 text-red-500 bg-transparent': !label,
          }),
        }}
        isDisabled={isPendingPillarRoute}
        onClose={onClose}
      >
        {label || slug}
      </Chip>
    </Tooltip>
  );
};

const TooltipContent = ({
  pillarSlug,
  slug,
}: {
  pillarSlug: string;
  slug: string;
}) => {
  return (
    <span>
      No {pillarSlug} matched:{' '}
      <span className="font-bold text-red-500">&#34;{slug}&#34;</span>
    </span>
  );
};
