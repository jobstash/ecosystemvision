import { Skeleton } from '@heroui/skeleton';

interface Props {
  wrapperClassName?: string;
  length: number;
}

export const TabSelectionsSkeleton = ({ wrapperClassName, length }: Props) => {
  return (
    <div className={wrapperClassName}>
      {Array.from({ length }).map((_, i) => (
        <Skeleton
          key={i}
          className="flex h-12 grow justify-center rounded-lg p-4"
        />
      ))}
    </div>
  );
};
