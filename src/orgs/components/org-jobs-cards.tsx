import { JOBSTASH_URL } from '@/shared/core/envs';
import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '@/shared/components/details-panel/card-wrapper';
import { DetailsPanelCTA } from '@/shared/components/details-panel/cta';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { OrgJob } from '@/orgs/core/schemas';
import { JobCardInfoTags } from '@/jobs/components/job-card/info-tags';

const CTA_TEXT = 'Explore Job';

interface Props {
  jobs: OrgJob[];
}

export const OrgJobsCards = ({ jobs }: Props) => {
  if (jobs.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {jobs.map((job) => (
        <DetailsPanelCardWrapper key={job.id}>
          <Heading text={job.title} />
          <JobCardInfoTags job={job} />
          <Divider />
          {job.summary && (
            <div className="flex flex-col gap-2">
              <Heading
                text="Summary"
                className="text-base font-semibold"
                htmlTag="h3"
              />
              <Text text={job.summary} />
            </div>
          )}
          <DetailsPanelActionsWrapper>
            <DetailsPanelCTA
              isNewTab
              text={CTA_TEXT}
              href={`${JOBSTASH_URL}/jobs/${job.shortUUID}/details`}
            />
          </DetailsPanelActionsWrapper>
        </DetailsPanelCardWrapper>
      ))}
    </div>
  );
};
