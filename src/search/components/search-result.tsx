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
    <div className="flex flex-col gap-3">
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
      label={<span className='text-13 font-light uppercase opacity-60'>{title}</span>}
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
