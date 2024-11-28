'use client';

import { useRouter } from 'next/navigation';

import { Chip } from '@nextui-org/chip';

interface Props {
  label: string;
  href: string;
}

export const PillarSearchInputItem = ({ label, href }: Props) => {
  const { push } = useRouter();
  const onClose = () => push(href);

  return (
    <Chip
      key={label}
      classNames={{
        base: 'rounded-lg bg-white/10',
      }}
      onClose={onClose}
    >
      {label}
    </Chip>
  );
};
