'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef } from 'react';

import { cn } from '@/shared/utils/cn';

import { useGranteeProject } from '@/grants/hooks/use-grantee-project';
import { ProjectSelectionItemSkeleton } from '@/grants/components/project-selections/project-selection-item-skeleton';

interface Props {
  projectId: string;
  href: string;
  isActiveBypass: boolean;
  showError: () => void;
}

export const ProjectSelection = ({
  projectId,
  href,
  isActiveBypass,
  showError,
}: Props) => {
  const { projectId: paramsProjectId } = useParams() as { projectId: string };

  const { data, error, isLoading } = useGranteeProject(projectId);

  const errorRef = useRef(false);

  if (isLoading) {
    return <ProjectSelectionItemSkeleton />;
  }

  // Parent component will handle error display
  if (error?.message && !errorRef.current) {
    errorRef.current = true;
    showError();
    return null;
  }

  const isActive = isActiveBypass || paramsProjectId === projectId;

  if (!data) return null;

  return (
    <Link
      prefetch
      href={href}
      scroll={false}
      className={cn(
        'flex grow justify-center rounded-lg px-4 py-4',
        'rounded-2xl bg-medium-gray px-3 py-3 text-center  text-base font-semibold',
        {
          'is-active': isActive,
        },
      )}
    >
      {data.data.name}
    </Link>
  );
};
