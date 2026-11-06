'use client';

import { Checkbox, CheckboxGroup, Label } from '@heroui/react';
import { useAtom } from 'jotai';

import { Divider } from '@/shared/components/divider';

import { currentFilterParamsAtom } from '@/search/core/atoms';

interface Props {
  label: string;
  items: { label: string; value: string | boolean }[];
  paramKey: string;
}

export const CheckboxFilter = ({ label, items, paramKey }: Props) => {
  const [currentFilterParams, setCurrentFilterParams] = useAtom(
    currentFilterParamsAtom,
  );
  const value = currentFilterParams[paramKey]?.current ?? [];

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
        init: prev[paramKey]?.init ?? '',
        current: [values.at(-1)!.toString()],
      },
    }));
  };

  return (
    <>
      <CheckboxGroup value={value} onChange={onValueChange}>
        <Label>{label}</Label>
        {items.map((item) => (
          <Checkbox
            key={item.value as string}
            value={item.value as string}
          >
            <Checkbox.Content>
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Label>{item.label}</Label>
            </Checkbox.Content>
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Divider />
    </>
  );
};
