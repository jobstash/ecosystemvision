import { TagsSection } from '@/shared/components/tags-section';

import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsOverview = ({ org }: Props) => {
  const { tags } = org;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-white/80">{org.description}</span>
      <TagsSection tags={tags} />
    </div>
  );
};
