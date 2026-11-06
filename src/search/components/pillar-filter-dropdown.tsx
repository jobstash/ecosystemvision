'use client';

import { Button, Popover } from '@heroui/react';

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
      <Popover>
        <Button variant="secondary">
          <span>{label ?? formatPillarName(pillar)}</span>
          <CaretDownIcon />
        </Button>
        <Popover.Content placement="bottom start">
          <Popover.Dialog aria-label={label ?? formatPillarName(pillar)} className="flex flex-col gap-4 p-4">
            {children}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};
