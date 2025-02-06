import { Tag } from '@/shared/core/schemas';
import { Heading } from '@/shared/components/heading';

import { TagsSectionProvider } from './context';
import { TagsSectionSpinner } from './spinner';
import { TagsWrapper } from './tags-wrapper';
import { TechWrapper } from './tech-wrapper';

const HEADING_TEXT = 'Technology & Skills';
const DESCRIPTION_TEXT =
  'Uncover the hard and soft skills and tools employed by the organization, and gain insight into the technologies that drive their success';

interface Props {
  nav: string;
  tags: Tag[];
}

export const TagsSection = ({ nav, tags }: Props) => {
  const hasTags = tags.length > 0;

  if (!hasTags) return null;

  return (
    <TagsSectionProvider>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Heading className="text-lg text-white/90" text={HEADING_TEXT} />
          <TagsSectionSpinner />
        </div>
        <span className="text-white/80">{DESCRIPTION_TEXT}</span>
      </div>

      <TagsWrapper>
        {tags.map((tag) => (
          <TechWrapper
            key={tag.id}
            id={tag.id}
            nav={nav}
            slug={tag.normalizedName}
          >
            {tag.name}
          </TechWrapper>
        ))}
      </TagsWrapper>
    </TagsSectionProvider>
  );
};
