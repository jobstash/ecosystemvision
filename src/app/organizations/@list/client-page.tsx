'use client';

import dynamic from 'next/dynamic';

const OrgList = dynamic(() =>
  import('@/orgs/components/org-list').then((m) => m.OrgList),
);

// TODO: Add rawSearchParams prop for filters
export const OrgListClientPage = () => {
  return <OrgList />;
};
