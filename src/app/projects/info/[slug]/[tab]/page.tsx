import { notFound } from 'next/navigation';

import { getProjectDetails } from '@/projects/data/get-project-details';
import { ProjectDetailsOrg } from '@/projects/components/project-details-org';

interface Props {
  params: Promise<{ slug: string; tab: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug, tab } = await params;

  const project = await getProjectDetails(slug);

  const hasOrgs = project.organizations.length > 0;
  if (tab.toLowerCase() === 'organizations' && hasOrgs) {
    return <ProjectDetailsOrg project={project} />;
  }

  notFound();
};

export default Page;
