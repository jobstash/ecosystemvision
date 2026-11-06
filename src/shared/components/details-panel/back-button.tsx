'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@heroui/react';

import { A11Y, TEST_IDS } from '@/shared/core/constants';

interface Props {
  href: string;
  text?: string;
}

export const DetailsPanelBackButton = ({
  href,
  text = A11Y.LINK.BACK,
}: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href, { scroll: false });
  };

  return (
    <Button variant="outline" className="rounded-lg border-white/10" onPress={onClick} data-testid={TEST_IDS.DETAILS_BACK}>{text}</Button>
  );
};
