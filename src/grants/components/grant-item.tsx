import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { GRANT_TEST_IDS } from '@/grants/core/constants';

interface Props {
  id: string;
}

export const GrantItem = ({ id }: Props) => {
  const href = `/grants/${id}`;

  // TODO: JOB-679

  return (
    <Button
      href={href}
      as={Link}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
      data-uuid={id}
      prefetch={true}
      className="flex h-[300px] flex-col gap-3 rounded-lg bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
    >
      <span className="font-bold">{`Grant Program #${id}`}</span>
    </Button>
  );
};
