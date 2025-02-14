import { Checkbox, CheckboxGroup } from '@heroui/checkbox';
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
