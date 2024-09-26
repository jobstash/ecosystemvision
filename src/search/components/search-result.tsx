import { SearchResultDto } from '@/search/core/schemas';
import { SearchCategory } from '@/search/components/search-category';

export const SearchResultLayout = ({
  label,
  categories,
}: {
  label: React.ReactNode;
  categories: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {label}
      <div className="flex flex-wrap gap-4">{categories}</div>
    </div>
  );
};

interface Props extends SearchResultDto {
  query: string;
}

export const SearchResult = ({ query, title, categories }: Props) => {
  return (
    <SearchResultLayout
      label={<span>{title}</span>}
      categories={
        <>
          {categories.map(({ label, url }) => (
            <SearchCategory key={label} query={query} label={label} url={url} />
          ))}
        </>
      }
    />
  );
};
