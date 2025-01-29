'use client';

import { useState } from 'react';

import { Checkbox, CheckboxGroup } from '@heroui/checkbox';

import { Divider } from '@/shared/components/divider';

interface Props {
  label: string;
  items: { label: string; value: string | boolean }[];
}

export const BooleanFilter = ({ label, items }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const onValueChange = (values: string[]) => {
    if (values.length < 2) return setSelected(values);
    setSelected([values.at(-1)!]);
  };
  return (
    <>
      <CheckboxGroup
        label={label}
        value={selected}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <Checkbox
            key={item.value as string}
            color="default"
            value={item.value as string}
          >
            {item.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Divider />
    </>
  );
};
