import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarItem } from './pillar-item';

interface Props {
  itemParam: string;
  title: string | null;
  selectedItems: { label: string; href: string }[];
  items: { label: string; href: string }[];
}

export const PillarRow = (props: Props) => {
  const { itemParam, title, selectedItems, items } = props;

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <div className="pl-2 text-13 uppercase text-accent2/90">
          <span>{title}</span>
        </div>
      )}
      <div className="relative flex h-14 gap-4 overflow-hidden p-1">
        <div className="flex max-w-fit flex-wrap gap-4">
          {selectedItems.map(({ label, href }) => (
            <PillarItem
              isActive
              key={label}
              label={label}
              href={normalizeString(label) === itemParam ? '' : href}
            />
          ))}
          {items.map(({ label, href }) => (
            <PillarItem
              key={label}
              isActive={false}
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
