import { CompactJobCard } from '@/shared/components/compact-job-card';
import { Heading } from '@/shared/components/heading';

import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsJobs = ({ org }: Props) => {
  const { jobs } = org;

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
      <div className="grid gap-2 lg:grid-cols-2">
        {jobs.map((job) => (
          <CompactJobCard
            job={{
              ...job,
              organizationName: org.name,
              publishedTimestamp: job.timestamp,
            }}
            key={job.id}
          />
        ))}
      </div>
    </>
  );
};
