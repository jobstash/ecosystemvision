import { Tag } from '@/shared/core/schemas';
import { Heading } from '@/shared/components/heading';
import TechWrapper from '@/shared/components/tech-wrapper';

const HEADING_TEXT = 'Technology & Skills';
const DESCRIPTION_TEXT =
  'Uncover the hard and soft skills and tools employed by the organization, and gain insight into the technologies that drive their success';

interface Props {
  tags: Tag[];
}

export const TagsSection = ({ tags }: Props) => {
  const hasTags = tags.length > 0;

  if (!hasTags) return null;

  return (
    <>
      <div className="flex flex-col gap-2">
        <Heading className="text-lg text-white/90" text={HEADING_TEXT} />
        <span className="text-white/80">{DESCRIPTION_TEXT}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TechWrapper key={tag.id} id={tag.id}>
            {tag.name}
          </TechWrapper>
        ))}
      </div>
    </>
  );
};
