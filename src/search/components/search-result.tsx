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
      <div className="flex flex-wrap gap-4">{items}</div>
    </div>
  );
};

interface Props extends TSearchResult {
  query: string;
}

export const SearchResult = ({ query, title, items }: Props) => {
  return (
    <SearchResultLayout
      label={
        <span className="text-13 font-light uppercase opacity-60">{title}</span>
      }
      items={
        <>
          {items.map(({ label, href }) => (
            <SearchResultItem
              key={label}
              query={query}
              label={label}
              href={href}
            />
          ))}
        </>
      }
    />
  );
};
