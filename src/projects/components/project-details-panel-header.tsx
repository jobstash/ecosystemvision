'use client';

import { Spinner } from '@nextui-org/spinner';

import { DetailsPanelHeader } from '@/shared/components/details-panel/header';

import { useProjectDetails } from '@/projects/hooks/use-project-details';

interface Props {
  id: string;
}

export const ProjectDetailsPanelHeader = ({ id }: Props) => {
  const { data } = useProjectDetails(id);
  if (!data) return <Spinner size="sm" color="white" />;

  return <DetailsPanelHeader org={data.organization} />;
};
