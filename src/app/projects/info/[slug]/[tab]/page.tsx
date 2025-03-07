import { notFound } from 'next/navigation';

import { getProjectDetails } from '@/projects/data/get-project-details';
import { ProjectDetailsGrants } from '@/projects/components/project-details-grants';
import { ProjectDetailsOrg } from '@/projects/components/project-details-org';

interface Props {
  params: Promise<{ slug: string; tab: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug, tab } = await params;

  const project = await getProjectDetails(slug);
  const { organizations, grants } = project;

  const hasOrgs = organizations.length > 0;
  if (tab.toLowerCase() === 'organizations' && hasOrgs) {
    return <ProjectDetailsOrg project={project} />;
  }

  const hasGrants = project.grants.length > 0;
  if (tab.toLowerCase() === 'grants' && hasGrants) {
    return <ProjectDetailsGrants grants={grants} />;
  }

  notFound();
};

export default Page;
