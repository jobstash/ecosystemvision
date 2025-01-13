'use client';

import { useRouter } from 'next/navigation';

import { Chip } from '@nextui-org/chip';

import { cn } from '@/shared/utils/cn';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  slug: string;
  label: string | null;
  href: string;
}

export const PillarSearchInputItem = ({ slug, label, href }: Props) => {
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const router = useRouter();

  const onClose = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
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
  );
};
