'use client';

import { Button, Popover } from '@heroui/react';

import { cn } from '@/shared/utils/cn';

interface Props {
  children: React.ReactNode;
}

export const PillarItemsDropdown = ({ children }: Props) => {
  return (
    <div className="flex justify-end p-1 pt-0">
      <Popover>
        <Button variant="outline" className="rounded-xl border border-white/20">
          <span>More</span><CaretDown />
        </Button>
        <Popover.Content placement="bottom end">
          <Popover.Dialog aria-label="More filters" className="flex flex-col gap-4 p-4">
            {children}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

const CaretDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    strokeWidth="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
    className={cn('size-4', props.className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    ></path>
  </svg>
);
