import { cn } from '@/shared/utils/cn';

interface Props {
  className?: string;
  title?: string;
}

export const EcosystemMark = ({
  className,
  title = 'Ecosystem Vision',
}: Props) => (
  <svg
    aria-label={title}
    className={cn('text-emerald-200', className)}
    role="img"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 48 18 32l10 11 8-9 10 12 14-18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
    <path
      d="M14 23c5.2-7 11.2-10.5 18-10.5S44.8 16 50 23c-5.2 7-11.2 10.5-18 10.5S19.2 30 14 23Z"
      fill="#070708"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="3"
    />
    <circle cx="32" cy="23" fill="currentColor" r="5.5" />
    <circle cx="34" cy="21" fill="#fff" fillOpacity=".75" r="1.5" />
  </svg>
);
