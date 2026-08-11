import { createSocialsInfoTagProps } from '@/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { DetailsHeader } from '@/shared/components/details-header';

import { ProjectDetails } from '@/projects/core/schemas';
import { createProjectInfoTagProps } from '@/projects/utils/create-project-info-tag-props';

interface Props {
  project: ProjectDetails;
}

export const ProjectDetailsHeader = ({ project }: Props) => {
  const { name, logo, website, summary, description } = project;
  const src = getLogoUrl(website!, logo);
  const infoTags = createProjectInfoTagProps(project, undefined, website);
  const socialTags = createSocialsInfoTagProps(project, { website: false });
  const headerSummary = summary?.trim() || description?.trim() || '';

  return (
    <DetailsHeader
      src={src}
      name={name}
      summary={headerSummary}
      infoTags={infoTags}
      socialTags={socialTags}
    />
  );
};
