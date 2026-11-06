'use client';

import { Spinner } from '@heroui/react';

import { DetailsPanelHeader } from '@/shared/components/details-panel/header';

import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  slug: string;
}

export const OrgDetailsPanelHeader = ({ slug }: Props) => {
  const { data } = useOrgDetails(slug);

  if (!data) return <Spinner size="sm" color="current"  />;

  return <DetailsPanelHeader org={data} />;
};
