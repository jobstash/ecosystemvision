import { cn } from '@/shared/utils/cn';

export const CaretDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
