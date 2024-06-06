'use client';

import { Spinner } from '@nextui-org/spinner';

import { DetailsPanelHeader } from '@/shared/components/details-panel/header';

import { useProjectDetails } from '@/projects/hooks/use-project-details';

interface Props {
  slug: string;
}

export const ProjectDetailsPanelHeader = ({ slug }: Props) => {
  const { data } = useProjectDetails(slug);
  if (!data) return <Spinner size="sm" color="white" />;

  return <DetailsPanelHeader org={data.organization} />;
};
