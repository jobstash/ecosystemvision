'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Skeleton } from '@nextui-org/react';

import { cn } from '@/shared/utils/cn';

import { useGranteeProject } from '@/grants/hooks/use-grantee-project';

const SHARED_CLASSNAME = 'flex grow justify-center rounded-lg px-4 py-4';

interface Props {
  firstId: string;
  projectId: string;
  baseHref: string;
}

export const ProjectSelection = ({ firstId, projectId, baseHref }: Props) => {
  const params = useParams();
  const paramsProjectId = params.projectId as string;

  const isActive = paramsProjectId
    ? paramsProjectId === projectId
    : projectId === firstId; // Default to first project if no project-id params

  const { data } = useGranteeProject(paramsProjectId ?? firstId);

  const href = `${baseHref}/${projectId}`;

  if (!data) return <Skeleton className={cn(SHARED_CLASSNAME, 'h-14')} />;

  return (
    <Link
      prefetch
      href={href}
      scroll={false}
      className={cn(SHARED_CLASSNAME, 'bg-white/5', {
        'bg-primary': isActive,
      })}
    >
      {data.data.name}
    </Link>
  );
};

interface SelectionsProps {
  baseHref: string;
  projects: string[];
}

export const ProjectSelections = ({ baseHref, projects }: SelectionsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="flex w-full gap-4 bg-white/5 p-4">
      {projects.map((projectId) => (
        <ProjectSelection
          key={projectId}
          firstId={projects[0]}
          projectId={projectId}
          baseHref={baseHref}
        />
      ))}
    </div>
  );
};
