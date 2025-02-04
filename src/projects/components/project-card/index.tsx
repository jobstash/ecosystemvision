import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';
import { ProjectInfo } from '@/shared/core/schemas';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { normalizeString } from '@/shared/utils/normalize-string';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { ChainsInfoTag } from '@/shared/components/chains-info-tag';
import { Divider } from '@/shared/components/divider';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';

import { PROJECT_TEST_IDS } from '@/projects/core/constants';
import { activeProjectSlugAtom } from '@/projects/core/atoms';

import { createProjectTags } from './create-project-tags';

interface Props {
  project: ProjectInfo;
  isInit?: boolean;
  filterParamsString?: string;
}

export const ProjectCard = (props: Props) => {
  const { project, isInit, filterParamsString = '' } = props;
  const {
    normalizedName: slug,
    website,
    logo,
    name,
    chains,
    summary,
  } = project;

  const src = getLogoUrl(website || '', logo);
  const { upperTags, midTags } = createProjectTags(project);
  // const href = `${HREFS.PROJECTS_PAGE}/names/${normalizeString(slug)}/details${filterParamsString}`;
  const href = `${HREFS.PROJECTS_PAGE}/info/${normalizeString(slug)}${filterParamsString}`;

  return (
    <CardWrapper id={slug} idAtom={activeProjectSlugAtom}>
      <Link
        href={href}
        data-testid={PROJECT_TEST_IDS.PROJECT_CARD}
        data-uuid={slug}
        data-is-init={isInit ?? undefined}
        prefetch={true}
        className="flex flex-col gap-3 p-6"
      >
        <LogoTitle src={src} name={name} />

        {summary && (
          <>
            <p className="text-sm text-white/80">{summary}</p>
          </>
        )}

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
