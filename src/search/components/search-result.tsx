import { DraggableWrapper } from '@/shared/components/draggable-wrapper';

import { TSearchResult } from '@/search/core/schemas';
import { SearchResultItem } from '@/search/components/search-result-item';

export const SearchResultLayout = ({
  label,
  items,
}: {
  label: React.ReactNode;
  items: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {label}
      <DraggableWrapper className="flex items-center gap-4">
        {items}
      </DraggableWrapper>
    </div>
  );
};

interface Props extends TSearchResult {
  query: string;
  isPillarSearchResult?: boolean;
}

export const SearchResult = ({
  query,
  title,
  items,
  isPillarSearchResult,
}: Props) => {
  return (
    <SearchResultLayout
      label={
        <span className="text-13 uppercase text-accent2">
          suggested {title}
        </span>
      }
      items={
        <>
          {items.map(({ label, href }) => (
            <SearchResultItem
              key={label}
              query={query}
              label={label}
              href={href}
              isPillarSearchResult={isPillarSearchResult}
            />
          ))}
        </>
      }
    />
  );
};
