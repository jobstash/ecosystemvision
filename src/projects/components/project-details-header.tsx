import { createSocialsInfoTagProps } from '@/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { DetailsHeader } from '@/shared/components/details-header';

import { ProjectDetails } from '@/projects/core/schemas';
import { createProjectInfoTagProps } from '@/projects/utils/create-project-info-tag-props';

interface Props {
  project: ProjectDetails;
}

const SUMMARY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus felis in nisi tincidunt, vitae facilisis enim tempor. ';

export const ProjectDetailsHeader = ({ project }: Props) => {
  const { name, logo, website } = project;
  const src = getLogoUrl(website!, logo);
  const infoTags = createProjectInfoTagProps(project, undefined, website);
  const socialTags = createSocialsInfoTagProps(project, { website: false });

  return (
    <DetailsHeader
      src={src}
      name={name}
      summary={SUMMARY}
      infoTags={infoTags}
      socialTags={socialTags}
    />
  );
};
