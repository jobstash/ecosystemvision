'use client';

import { Checkbox } from '@heroui/checkbox';
import { useAtom } from 'jotai';

import { Divider } from '@/shared/components/divider';

import { currentFilterParamsAtom } from '@/search/core/atoms';

interface Props {
  label: string;
  items: { label: string; value: string | boolean }[];
  paramKey: string;
}

export const MultiSelectFilter = ({ label, items, paramKey }: Props) => {
  const [currentFilterParams, setCurrentFilterParams] = useAtom(
    currentFilterParamsAtom,
  );
  const selected = currentFilterParams[paramKey]?.current ?? [];

  const toggle = (itemValue: string, isSelected: boolean) => {
    setCurrentFilterParams((previous) => {
      const current = previous[paramKey]?.current ?? [];
      const next = isSelected
        ? [...new Set([...current, itemValue])]
        : current.filter((value) => value !== itemValue);

      if (next.length === 0) {
        const { [paramKey]: _, ...rest } = previous;
        return rest;
      }

      return {
        ...previous,
        [paramKey]: {
          init: previous[paramKey]?.init ?? '',
          current: next,
        },
      };
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-white/65">{label}</h3>
      <div className="grid max-h-64 gap-3 overflow-y-auto rounded-2xl border border-white/10 p-4 sm:grid-cols-2">
        {items.map((item) => {
          const value = item.value.toString();
          return (
            <Checkbox
              color="default"
              isSelected={selected.includes(value)}
              key={value}
              onValueChange={(isSelected) => toggle(value, isSelected)}
            >
              {item.label}
            </Checkbox>
          );
        })}
      </div>
      <Divider />
    </div>
  );
};
