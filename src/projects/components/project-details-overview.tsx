import { Heading } from '@/shared/components/heading';
import { TagsSection } from '@/shared/components/tags-section';

import { ProjectDetails } from '@/projects/core/schemas';

interface Props {
  project: ProjectDetails;
}

export const ProjectDetailsOverview = ({ project }: Props) => {
  const { description, organizations } = project;
  const tags = organizations.flatMap((org) => org.tags);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading className="text-lg text-white/90" text="Description" />
        <span className="text-white/80">{description}</span>
      </div>
      <TagsSection nav="projects" tags={tags} />
    </div>
  );
};
