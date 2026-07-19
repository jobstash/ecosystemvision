import Link from 'next/link';

import { JOBSTASH_URL } from '@/shared/core/envs';
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
    <section aria-labelledby="organization-crypto-jobs">
      <Heading
        text={`${org.name} crypto jobs`}
        className="text-2xl font-semibold text-white"
        id="organization-crypto-jobs"
      />
      <p className="mb-4 mt-2 text-sm text-white/50">
        Explore open blockchain and Web3 roles at {org.name}, sourced from{' '}
        <Link
          className="text-emerald-300/80 transition hover:text-emerald-200"
          href={JOBSTASH_URL}
          rel="external noopener"
          target="_blank"
        >
          JobStash&apos;s crypto job board
        </Link>
        .
      </p>
      <div className="grid gap-2 lg:grid-cols-2" role="list">
        {jobs.map((job) => (
          <div key={job.id} role="listitem">
            <CompactJobCard
              job={{
                ...job,
                organizationName: org.name,
                publishedTimestamp: job.timestamp,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
