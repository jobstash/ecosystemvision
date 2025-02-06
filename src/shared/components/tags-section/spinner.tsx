'use client';

import { Spinner } from '@heroui/spinner';

import { useTagsSectionContext } from './context';

export const TagsSectionSpinner = () => {
  const { isLoading } = useTagsSectionContext();

  if (!isLoading) return null;

  return <Spinner size="sm" color="white" />;
};
