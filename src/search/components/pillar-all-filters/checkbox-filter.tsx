import { Checkbox, CheckboxGroup } from '@heroui/checkbox';

import { Divider } from '@/shared/components/divider';

interface Props {
  label: string;
  items: { label: string; value: string }[];
}

export const CheckboxFilter = ({ label, items }: Props) => {
  return (
    <>
      <CheckboxGroup label={label}>
        {items.map((item) => (
          <Checkbox key={item.value} color="default" value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Divider />
    </>
  );
};
