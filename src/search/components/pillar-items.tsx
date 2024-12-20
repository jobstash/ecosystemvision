import { capitalize } from '@/shared/utils/capitalize';
import {
  denormalizeString,
  normalizeString,
} from '@/shared/utils/normalize-string';

import { PillarParams, TPillarItem } from '@/search/core/types';
import { PillarItem } from '@/search/components/pillar-item';
import { PillarItemsDropdown } from '@/search/components/pillar-items-dropdown';

interface Props {
  items: TPillarItem[];
  dropdownContent: React.ReactNode;
  params: PillarParams;
  pillarSlug: string;
  hasLabel?: boolean;
}

export const PillarItems = ({
  items,
  dropdownContent,
  params,
  pillarSlug,
  hasLabel = true,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {hasLabel && (
        <div className="pl-2 text-13 uppercase text-accent2/90">
          <span>{capitalize(denormalizeString(pillarSlug))}</span>
        </div>
      )}
      <div className="relative flex h-14 gap-4 overflow-hidden p-1">
        <div className="flex max-w-fit flex-wrap gap-4">
          {items.map((item) => (
            <PillarItem
              key={item.label}
              isMainPillarItem={normalizeString(item.label) === params.item}
              item={item}
              pillarSlug={pillarSlug}
            />
          ))}
        </div>
        <div className="shrink-0 grow">
          <PillarItemsDropdown>{dropdownContent}</PillarItemsDropdown>
        </div>
      </div>
    </div>
  );
};
