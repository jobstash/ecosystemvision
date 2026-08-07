import Link from 'next/link';

import { JOBSTASH_URL } from '@/shared/core/envs';
import { FundingSplit } from '@/shared/components/funding-split';
import { Heading } from '@/shared/components/heading';
import { TagsSection } from '@/shared/components/tags-section';

import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsOverview = ({ org }: Props) => {
  const { tags, description, grants, fundingRounds } = org;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading className="text-lg text-white/90" text="Description" />
        <span className="text-white/80">{description}</span>
      </div>
      <FundingSplit grants={grants} fundingRounds={fundingRounds} />
      <TagsSection nav="organizations" tags={tags} />
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <Heading className="text-lg text-white/90" text="Open roles" />
        <p className="mt-2 text-sm text-white/60">
          Job details and availability are maintained by JobStash.
        </p>
        <Link
          className="mt-3 inline-flex text-sm text-emerald-300 transition hover:text-emerald-200"
          href={`${JOBSTASH_URL}/?organizations=${encodeURIComponent(org.normalizedName)}`}
          rel="external noopener"
          target="_blank"
        >
          View all {org.name} roles on JobStash
        </Link>
      </div>
    </div>
  );
};
