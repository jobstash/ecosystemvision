'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';

import { initialSelectedPillarItems } from './atoms';
import { PillarItem } from './pillar-item';
import { PillarRowItem } from './types';

interface Props {
  pillar: string | null;
  pillarItems: PillarRowItem[];
}

export const PillarRow = (props: Props) => {
  const { pillar, pillarItems } = props;

  const [items, setItems] = useState<PillarRowItem[]>([]);
  useEffect(() => {
    if (items.length === 0 && pillarItems.length > 0) {
      setItems(pillarItems);
    }
  }, [items.length, pillarItems]);

  const clientInitialItems = useAtomValue(initialSelectedPillarItems);

  const finalItems = useMemo(() => {
    const initialLabels = new Set(
      clientInitialItems
        .filter((item) => item.pillar === pillar)
        .map((item) => item.label),
    );

    const initialGroup = items.filter((item) => initialLabels.has(item.label));

    const remainingGroup = items.filter(
      (item) => !initialLabels.has(item.label),
    );

    return [...initialGroup, ...remainingGroup];
  }, [clientInitialItems, pillar, items]);

  console.log({ pillarItems, clientInitialItems, items: finalItems });

  return (
    <div className="flex flex-col gap-1">
      {pillar && (
        <div className="pl-2 text-13 uppercase text-accent2/90">
          <span>{pillar}</span>
        </div>
      )}
      <div className="relative flex h-14 gap-4 overflow-hidden p-1">
        <div className="flex max-w-fit flex-wrap gap-4">
          {finalItems.map(({ label, href, isActive }) => (
            <PillarItem
              key={label}
              isActive={isActive}
              label={label}
              href={href}
            />
          ))}
        </div>

        <div className="shrink-0 grow">
          <p>{'<More />'}</p>
        </div>
      </div>
    </div>
  );
};
