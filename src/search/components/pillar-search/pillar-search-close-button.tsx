'use client';

import { Button } from '@heroui/react';
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
    <Button isIconOnly aria-label="Close search"
    size="sm" variant="ghost" className="bg-white/5" onPress={onClick} ><CloseIcon /></Button>
  );
};
