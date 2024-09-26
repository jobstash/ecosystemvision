import { z } from 'zod';

export const searchResultsDtoSchema = z.array(
  z.object({
    title: z.string(),
    categories: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
);

export type SearchResultsDto = z.infer<typeof searchResultsDtoSchema>;
export type SearchResultDto = SearchResultsDto[number];
