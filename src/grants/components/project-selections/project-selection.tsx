'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/utils/cn';

import { useGranteeProject } from '@/grants/hooks/use-grantee-project';
import { ProjectSelectionItemSkeleton } from '@/grants/components/project-selections/project-selection-item-skeleton';

interface Props {
  projectId: string;
  href: string;
  isActiveBypass: boolean;
}

export const ProjectSelection = ({
  projectId,
  href,
  isActiveBypass,
}: Props) => {
  const { projectId: paramsProjectId } = useParams() as { projectId: string };

  const { data } = useGranteeProject(projectId);

  if (!data) {
    return <ProjectSelectionItemSkeleton />;
  }

  const isActive = isActiveBypass || paramsProjectId === projectId;

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
