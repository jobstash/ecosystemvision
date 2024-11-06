'use client';

import { GrantListItems } from '@/grants/components/grant-list/grant-list-items';

import { useGrantList } from './use-grant-list';

export const FetchedGrantList = () => {
  const props = useGrantList('inactive');
  return <GrantListItems {...props} ctaText="View Program" />;
};

export const GrantList = () => {
  return <FetchedGrantList />;
};
