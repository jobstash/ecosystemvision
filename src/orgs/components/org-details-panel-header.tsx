'use client';

import { Spinner } from '@nextui-org/spinner';

import { DetailsPanelHeader } from '@/shared/components/details-panel/header';

import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  id: string;
}

export const OrgDetailsPanelHeader = ({ id }: Props) => {
  const { data } = useOrgDetails(id);

  if (!data) return <Spinner size="sm" color="white" />;

  return <DetailsPanelHeader org={data} />;
};
