'use client';

import { Checkbox, CheckboxGroup } from '@heroui/checkbox';
import { useAtom } from 'jotai';

import { Divider } from '@/shared/components/divider';

import { currentFilterParamsAtom } from '@/search/core/atoms';

interface Props {
  paramKey: string;
  label: string;
  items: { label: string; value: string | boolean }[];
}

export const BooleanFilter = ({ paramKey, label, items }: Props) => {
  const [currentFilterParams, setCurrentFilterParams] = useAtom(
    currentFilterParamsAtom,
  );
  const currentFilterValue = currentFilterParams[paramKey];
  const value = currentFilterValue ? [currentFilterValue.init] : [];

  const onValueChange = (values: string[]) => {
    if (values.length === 0) {
      return setCurrentFilterParams((prev) => {
        const { [paramKey]: _, ...rest } = prev;
        return rest;
      });
    }

    setCurrentFilterParams((prev) => ({
      ...prev,
      [paramKey]: {
        init: values.at(-1)!.toString(),
      },
    }));
  };
  return (
    <>
      <CheckboxGroup label={label} value={value} onValueChange={onValueChange}>
        {items.map((item) => (
          <Checkbox
            key={item.label}
            color="default"
            value={item.value.toString()}
          >
            {item.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Divider />
    </>
  );
};
