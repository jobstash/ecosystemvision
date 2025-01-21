import { capitalize } from '@/shared/utils/capitalize';
import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarDto } from '@/search/core/schemas';

import { PillarRow } from './pillar-row';
import { LabeledItem } from './types';

interface Props {
  pathPrefix: string;
  searchParams: Record<string, string>;
  itemParam: string;
  labeledItems: LabeledItem[];
  pillars: PillarDto[];
}

export const PillarRows = ({
  pathPrefix,
  searchParams,
  itemParam,
  labeledItems,
  pillars,
}: Props) => {
  const pillarRows = pillars.flatMap(({ slug: pillar, items }) => {
    const selectedLabels = new Set<string>();
    const selectedItems = labeledItems
      .filter(
        (labeledItem) =>
          labeledItem.pillar === pillar && labeledItem.label !== undefined,
      )
      .map(({ label, href }) => {
        selectedLabels.add(label as string);
        return { label, href };
      }) as {
      label: string;
      href: string;
    }[];

    const mappedItems = items
      .map((label) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const paramValues = newSearchParams.get(pillar)?.split(',') ?? [];
        paramValues.push(normalizeString(label));
        newSearchParams.set(pillar, paramValues.join(','));
        return { label, href: `${pathPrefix}?${newSearchParams.toString()}` };
      })
      .filter(({ label }) => !selectedLabels.has(label));

    return {
      title: capitalize(pillar),
      selectedItems,
      items: mappedItems,
    };
  });

  return (
    <>
      {pillarRows.map(({ title, selectedItems, items }) => (
        <PillarRow
          key={title}
          itemParam={itemParam}
          title={title}
          selectedItems={selectedItems}
          items={items}
        />
      ))}
    </>
  );
};
