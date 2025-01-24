import { Checkbox, CheckboxGroup } from '@heroui/checkbox';

import { Divider } from '@/shared/components/divider';

interface Props {
  label: string;
  items: string[];
}

export const CheckboxFilters = ({ label, items }: Props) => {
  return (
    <>
      <CheckboxGroup label={label}>
        {items.map((item) => (
          <Checkbox key={item} color="default" value={item}>
            {item}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Divider />
    </>
  );
};
