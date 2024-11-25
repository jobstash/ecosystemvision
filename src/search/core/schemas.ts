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
      title: title.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(),
      items: itemsDto.map(({ value, link }) => ({ label: value, href: link })),
    }))
    .filter(({ items }) => items.length > 0);
};

export const pillarDtoSchema = z.object({
  slug: z.string(),
  items: z.array(z.string()),
});
export type PillarDto = z.infer<typeof pillarDtoSchema>;

export const pillarInfoDtoSchema = z.object({
  title: z.string(),
  count: z.number(),
  description: z.string(),
  activePillar: pillarDtoSchema,
  altPillar: pillarDtoSchema,
  // TODO: Pillar filters
});
export type PillarInfoDto = z.infer<typeof pillarInfoDtoSchema>;

export const pillarInfoResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: pillarInfoDtoSchema,
});
export type PillarInfoResponse = z.infer<typeof pillarInfoResponseSchema>;

export const pillarInfoSchema = z.object({
  title: z.string(),
  count: z.number(),
  description: z.string(),
  activePillar: pillarDtoSchema,
  altPillar: pillarDtoSchema,
  // TODO: Pillar filters
});
export type TPillarInfo = z.infer<typeof pillarInfoSchema>;

export const dtoToPillarSearchResults = (dto: PillarInfoDto): TPillarInfo => {
  return {
    title: dto.title,
    count: dto.count,
    description: dto.description,
    activePillar: dto.activePillar,
    altPillar: dto.altPillar,
  };
};
