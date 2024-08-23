'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/utils/cn';

interface Props {
  projectId: string;
  name: string;
  href: string;
  isActiveBypass: boolean;
}

export const ProjectSelection = ({
  projectId,
  name,
  href,
  isActiveBypass,
}: Props) => {
  const { projectId: paramsProjectId } = useParams() as { projectId: string };

  const isActive = isActiveBypass || paramsProjectId === projectId;

  return (
    <Link
      prefetch
      href={href}
      scroll={false}
      className={cn(
        'flex grow justify-center rounded-lg px-4 py-4',
        'rounded-lg bg-medium-gray px-3 py-3 text-center text-base font-medium',
        {
          'is-active': isActive,
        },
      )}
    >
      {name}
    </Link>
  );
};
