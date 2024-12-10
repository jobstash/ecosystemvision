'use client';

import Link from 'next/link';
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
      as={Link}
      href={href}
      key={label}
      classNames={{
        base: 'rounded-lg bg-white/10',
      }}
      isDisabled={isPendingPillarRoute}
      onClick={onClose}
      onClose={onClose}
    >
      {label}
    </Chip>
  );
};
