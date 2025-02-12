'use client';

import { Button } from '@heroui/button';
import { useAtom } from 'jotai';

import { CloseIcon } from '@/shared/components/icons/close-icon';

import { isActiveSearchAtom } from '@/search/core/atoms';

export const PillarSearchCloseButton = () => {
  const [isActive, setIsActive] = useAtom(isActiveSearchAtom);

  const onClick = () => {
    setIsActive(false);
  };

  if (!isActive) return null;

  return (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      className="bg-white/5"
      onClick={onClick}
    >
      <CloseIcon />
    </Button>
  );
};
