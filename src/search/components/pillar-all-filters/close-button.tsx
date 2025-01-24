'use client';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { isActiveAllFiltersAtom } from '@/search/core/atoms';

export const CloseButton = () => {
  const setIsActive = useSetAtom(isActiveAllFiltersAtom);
  const close = () => setIsActive(false);
  return (
    <Button isIconOnly size="sm" onClick={close}>
      X
    </Button>
  );
};
