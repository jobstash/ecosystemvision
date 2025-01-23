import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';

import { cn } from '@/shared/utils/cn';

import { CaretDownIcon } from './caret-down-icon';
import { PillarItem } from './pillar-item';
import { PillarLoadingWrapper } from './pillar-loading-wrapper';
import { PillarRowItem } from './types';

interface Props {
  pillar: string;
  pillarItems: PillarRowItem[];
  dropdownContent: React.ReactNode;
  hidePillar?: boolean;
}

export const PillarRow = (props: Props) => {
  const { pillar, pillarItems, dropdownContent, hidePillar } = props;

  return (
    <PillarLoadingWrapper>
      <div className="flex flex-col gap-1">
        {!hidePillar && (
          <div className="pl-2 text-13 uppercase text-accent2/90">
            <span>{pillar}</span>
          </div>
        )}
        <div className="relative flex h-14 gap-4 overflow-hidden p-1">
          <div className="flex max-w-fit flex-wrap gap-4">
            {pillarItems.map(({ label, href, isActive }) => (
              <PillarItem
                key={label}
                isActive={isActive}
                pillar={pillar}
                label={label}
                href={href}
              />
            ))}
          </div>

          <div className="shrink-0 grow justify-end">
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button
                  radius="md"
                  variant="bordered"
                  className={cn('border border-white/20', {})}
                  endContent={<CaretDownIcon />}
                >
                  <span>More</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-4 p-4">
                {dropdownContent}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </PillarLoadingWrapper>
  );
};
