import { z } from 'zod';

export const searchResultItemDtoSchema = z.object({
  value: z.string(),
  link: z.string(),
});
export type SearchResultItemDto = z.infer<typeof searchResultItemDtoSchema>;

export const searchResultsDtoSchema = z.record(
  z.string(),
  z.array(searchResultItemDtoSchema),
);
export type SearchResultsDto = z.infer<typeof searchResultsDtoSchema>;

export const searchResultItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});
export type TSearchResultItem = z.infer<typeof searchResultItemSchema>;

export const searchResultSchema = z.object({
  title: z.string(),
  items: z.array(searchResultItemSchema),
});
export type TSearchResult = z.infer<typeof searchResultSchema>;

export const searchResultsSchema = z.array(searchResultSchema);
export type TSearchResults = z.infer<typeof searchResultsSchema>;

export const dtoToSearchResults = (dto: SearchResultsDto): TSearchResults => {
  return Object.entries(dto)
    .map(([title, itemsDto]) => ({
      title: title.toUpperCase(),
      items: itemsDto.map(({ value, link }) => ({ label: value, href: link })),
    }))
    .filter(({ items }) => items.length > 0);
};
