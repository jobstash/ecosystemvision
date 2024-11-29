'use client';

import { useRouter } from 'next/navigation';

import { Chip } from '@nextui-org/chip';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  label: string;
  href: string;
}

export const PillarSearchInputItem = ({ label, href }: Props) => {
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
        base: 'rounded-lg bg-white/10',
      }}
      isDisabled={isPendingPillarRoute}
      onClose={onClose}
    >
      {label}
    </Chip>
  );
};
