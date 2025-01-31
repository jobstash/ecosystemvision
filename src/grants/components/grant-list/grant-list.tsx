'use client';

import { GA_EVENT } from '@/shared/core/constants';

import { GrantListItems } from '@/grants/components/grant-list/grant-list-items';

import { useGrantList } from './use-grant-list';

export const FetchedGrantList = () => {
  const props = useGrantList('inactive');
  const gaEvent = GA_EVENT.GRANTS.VIEW_PROGRAM;
  return <GrantListItems gaEvent={gaEvent} {...props} />;
};

export const GrantList = () => {
  return <FetchedGrantList />;
};
