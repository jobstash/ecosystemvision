import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';

import { capitalize } from '@/shared/utils/capitalize';
import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';

interface Props {
  pillar: string;
  children: React.ReactNode;
}

export const PillarFilterDropdown = ({ pillar, children }: Props) => {
  return (
    <div className="shrink-0 grow justify-end">
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button endContent={<CaretDownIcon />}>
            <span>{capitalize(pillar)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-4">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};
