import React from 'react';

import { ROUTE_SECTIONS } from '@/shared/core/constants';
import { ProjectAllInfo } from '@/shared/core/schemas';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { ChainsInfoTag } from '@/shared/components/chains-info-tag';
import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '@/shared/components/details-panel/card-wrapper';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';
import { ShareButton } from '@/shared/components/share-button';
import { Text } from '@/shared/components/text';

import { createProjectAuditTags } from '@/projects/utils/create-project-audits-tag-props';
import { createProjectInfoTagProps } from '@/projects/utils/create-project-info-tag-props';

import { ProjectDetailsCardLinks } from './links';

interface Props {
  project: ProjectAllInfo;
  actions?: React.ReactNode;
}

export const ProjectDetailsCard = ({ project, actions }: Props) => {
  const { name, website, logo, description, chains } = project;

  const src = getLogoUrl(website || '', logo);

  const tags = createProjectInfoTagProps(project);
  const auditTags = createProjectAuditTags(project);

  return (
    <DetailsPanelCardWrapper>
      <div className="flex flex-wrap items-center gap-4 sm:justify-between">
        <LogoTitle src={src}>
          <Heading text={name} className="text-lg font-bold" />
        </LogoTitle>
        <DetailsPanelActionsWrapper className="shrink-0 gap-4">
          <ShareButton id={project.id} routeSection={ROUTE_SECTIONS.PROJECTS} />
        </DetailsPanelActionsWrapper>
      </div>

      <ProjectDetailsCardLinks project={project} />

      <Divider />
      <Heading
        text="Description"
        className="text-base font-semibold"
        htmlTag="h3"
      />
      <Text text={description} />

      <Divider />

      <InfoTags isCompact tags={tags} />

      {auditTags.length > 0 && <Divider />}

      <InfoTags tags={auditTags} />

      {chains.length > 0 && <Divider />}

      <ChainsInfoTag chains={chains} />

      {actions && (
        <>
          <Divider />
          {actions}
        </>
      )}
    </DetailsPanelCardWrapper>
  );
};
