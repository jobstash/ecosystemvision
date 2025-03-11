'use client';

import React from 'react';

import { Briefcase } from 'lucide-react';

import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '@/shared/components/details-panel/card-wrapper';
import { DetailsPanelCTA } from '@/shared/components/details-panel/cta';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { InfoTags } from '@/shared/components/info-tags';
import { ShareButton } from '@/shared/components/share-button';
import { Text } from '@/shared/components/text';

import { OrgDetails } from '@/orgs/core/schemas';
import { createOrgInfoTagProps } from '@/orgs/utils/create-job-info-tag-props';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsJobs = ({ org }: Props) => {
  const { jobs, normalizedName } = org;

  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-gray-500 text-center">No job listings available.</p>
    );
  }

  return (
    <>
      <Heading
        text="Job Listings"
        className="mb-4 text-2xl font-semibold text-white"
      />
      <div className="space-y-4">
        {jobs.map((job, index) => {
          const jobTags = createOrgInfoTagProps(job);
          const jobUrl = `${process.env.NEXT_PUBLIC_JOBSTASH_URL}/jobs/${job.shortUUID}/details?organizations=${normalizedName}`;

          return (
            <DetailsPanelCardWrapper key={job.id || `job-${index}`}>
              <div className="flex flex-wrap items-center justify-between">
                <Heading
                  text={job.title}
                  className="text-lg font-bold text-white"
                />
                <DetailsPanelActionsWrapper className="shrink-0">
                  <ShareButton id={job.id} routeSection="organizations" />
                </DetailsPanelActionsWrapper>
              </div>

              <Divider />
              <InfoTags tags={jobTags} />
              <Divider />

              {job.summary && (
                <>
                  <Heading
                    text="Description"
                    className="text-base font-semibold"
                    htmlTag="h3"
                  />
                  <Text text={job.summary} />
                  <Divider />
                </>
              )}

              {job.classification && (
                <>
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} className="text-white" />
                    <p className="text-gray-300">
                      Category: {job.classification}
                    </p>
                  </div>
                  <Divider />
                </>
              )}

              <DetailsPanelActionsWrapper>
                <DetailsPanelCTA
                  text="Explore Job"
                  href={jobUrl}
                  isActive={false}
                />
              </DetailsPanelActionsWrapper>
            </DetailsPanelCardWrapper>
          );
        })}
      </div>
    </>
  );
};
