import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';
import { ProjectInfo } from '@/shared/core/schemas';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { ChainsInfoTag } from '@/shared/components/chains-info-tag';
import { Divider } from '@/shared/components/divider';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';

import { activeProjectIdAtom } from '@/projects/core/atoms';

import { createProjectTags } from './create-project-tags';

interface Props {
  project: ProjectInfo;
  isInit?: boolean;
  filterParamsString?: string;
}

export const ProjectCard = ({ project, isInit, filterParamsString }: Props) => {
  const { id, website, logo, name, chains } = project;

  const src = getLogoUrl(website || '', logo);
  const { upperTags, midTags } = createProjectTags(project);

  return (
    <CardWrapper id={id} idAtom={activeProjectIdAtom}>
      <Link
        href={`${HREFS.PROJECTS_PAGE}/${id}/details${filterParamsString}`}
        scroll={false}
        data-uuid={id}
        data-is-init={isInit ?? undefined}
        prefetch={true}
        className="flex flex-col gap-3 p-6"
      >
        <LogoTitle src={src} name={name} />

        {upperTags.length > 0 && <Divider />}
        <InfoTags isCompact tags={upperTags} />

        {midTags.length > 0 && <Divider />}
        <InfoTags isCompact tags={midTags} />

        {chains.length > 0 && <Divider />}
        <ChainsInfoTag chains={chains} />
      </Link>
    </CardWrapper>
  );
};
