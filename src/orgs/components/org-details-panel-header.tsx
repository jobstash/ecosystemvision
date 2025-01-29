'use client';

import { Spinner } from '@heroui/spinner';

import { DetailsPanelHeader } from '@/shared/components/details-panel/header';

import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  slug: string;
}

export const OrgDetailsPanelHeader = ({ slug }: Props) => {
  const { data } = useOrgDetails(slug);

  if (!data) return <Spinner size="sm" color="white" />;

  return <DetailsPanelHeader org={data} />;
};
