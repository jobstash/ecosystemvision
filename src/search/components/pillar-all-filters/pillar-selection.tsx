'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Chip } from '@heroui/chip';

import { capitalize } from '@/shared/utils/capitalize';

interface Props {
  pillar: string;
  items: { label: string; href: string; isActive: boolean }[];
}

export const PillarSelection = ({ pillar, items }: Props) => {
  const [activeItems, setActiveItems] = useState(
    items.filter(({ isActive }) => isActive),
  );

  const onClose = (item: {
    label: string;
    href: string;
    isActive: boolean;
  }) => {
    setActiveItems((prev) => prev.filter((prevItem) => prevItem !== item));
  };

  // const router = useRouter();
  // const { startTransition } = usePillarRoutesContext();
  // const setIsActive = useSetAtom(isActiveAllFiltersAtom);
  // const onClose = (href: string) => {
  //   setIsActive(false);
  //   startTransition(() => {
  //     router.push(href);
  //   });
  // };

  return (
    <div className="space-y-8">
      <Autocomplete
        label={<span className="text-white/60">{capitalize(pillar)}</span>}
        labelPlacement="outside"
        className="max-w-sm"
        inputProps={{ radius: 'md' }}
        defaultItems={items}
        placeholder={`Search ${pillar}...`}
        variant="bordered"
      >
        {({ label, href }) => (
          <AutocompleteItem key={label} textValue={label}>
            <Link href={href}>{label}</Link>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex flex-wrap items-center gap-4">
        {activeItems.map((item) => {
          return (
            <Chip key={item.label} onClose={() => onClose(item)}>
              {item.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
};
