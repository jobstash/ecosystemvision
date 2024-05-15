'use client';

import { ChangeEventHandler, useState } from 'react';

import { Select, SelectItem } from '@nextui-org/select';
import { useAtom } from 'jotai';

import { SingleSelectFilterConfig } from '@/filters/core/schemas';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

interface SingleSelectProps {
  config: SingleSelectFilterConfig;
  paramValue: string;
}

const useSingleSelectInput = (props: SingleSelectProps) => {
  const { config, paramValue } = props;
  const { label, options, paramKey } = config;

  // Find option with corresponding value
  const option = options.find((option) => option.value === paramValue);

  // Initial value for select component is the label for the paramValue
  const initValue = option?.label ?? '';

  const [value, setValue] = useState(initValue);
  const selectedKeys = value ? [value] : [];

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParams] = useAtom(atom);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Map selected to config option
    const option = options.find((option) => option.label === inputValue);

    // Immutable search param
    const newParams = new URLSearchParams(filterParams);

    // Select -> Update filter param
    // Unselect -> Clear param
    option?.value
      ? newParams.set(paramKey, option.value.toString())
      : newParams.delete(paramKey);

    // Save changes
    setFilterParams(newParams);
  };

  return { label, selectedKeys, options, onChange };
};

export const SingleSelectInput = (props: SingleSelectProps) => {
  const { label, selectedKeys, options, onChange } =
    useSingleSelectInput(props);

  return (
    <Select
      size="sm"
      label={label}
      classNames={{
        trigger: 'bg-darkest-gray',
      }}
      selectedKeys={selectedKeys}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={label} value={value.toString()}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};
