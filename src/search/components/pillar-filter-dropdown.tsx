import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';

import { capitalize } from '@/shared/utils/capitalize';
import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';

const formatPillarName = (text: string) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

interface Props {
  pillar: string;
  label?: string;
  children: React.ReactNode;
}

export const PillarFilterDropdown = ({ pillar, label, children }: Props) => {
  return (
    <div className="shrink-0 grow justify-end">
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button endContent={<CaretDownIcon />}>
            <span>{label ?? formatPillarName(pillar)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-4">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};
