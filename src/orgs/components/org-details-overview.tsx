import { Heading } from '@/shared/components/heading';
import TechWrapper from '@/shared/components/tech-wrapper';

import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsOverview = ({ org }: Props) => {
  const { tags } = org;
  const hasTags = tags.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-white/80">{org.description}</span>

      {hasTags && (
        <>
          <div className="flex flex-col gap-2">
            <Heading
              className="text-xl text-white/90"
              text="Technology & Skills"
            />
            <span className="text-white/80">
              Uncover the hard and soft skills and tools employed by the
              organization, and gain insight into the technologies that drive
              their success
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <TechWrapper key={`${tag.id}-${i}`} id={tag.id}>
                {tag.name}
              </TechWrapper>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
