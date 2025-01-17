import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";

import { cn } from '@/shared/utils/cn';

interface Props {
  children: React.ReactNode;
}

export const PillarItemsDropdown = ({ children }: Props) => {
  return (
    <div className="flex justify-end p-1 pt-0">
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            radius="md"
            variant="bordered"
            className={cn('border border-white/20', {
              // 'text-accent2 border-accent2/60': !!hiddenItem,
            })}
            endContent={
              <CaretDown
              // className={cn({ 'stroke-2 text-accent2': !!hiddenItem })}
              />
            }
          >
            <span
            // className={cn({ 'font-bold': !!hiddenItem })}
            >
              More
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-4">
          {children}
        </PopoverContent>
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
