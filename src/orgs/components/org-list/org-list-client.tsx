'use client';

import dynamic from 'next/dynamic';

const OrgList = dynamic(() =>
  import('@/orgs/components/org-list/org-list').then((m) => m.OrgList),
);

interface Props {
  searchParams: string | Record<string, string>;
}

// TODO: Add rawSearchParams prop for filters
export const OrgListClient = ({ searchParams }: Props) => {
  return <OrgList searchParams={searchParams} />;
};
