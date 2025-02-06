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
    </div>
  );
};
