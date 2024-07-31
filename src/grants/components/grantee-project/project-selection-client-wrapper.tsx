'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import { cn } from '@/shared/utils/cn';

interface Props {
  firstId: string;
  projectId: string;
  baseHref: string;
  children: React.ReactNode;
}

export const ProjectSelectionClientWrapper = ({
  firstId,
  projectId,
  baseHref,
  children,
}: Props) => {
  const params = useParams();
  const paramsProjectId = params.projectId;

  const href = `${baseHref}/${projectId}`;
  const isActive = paramsProjectId
    ? paramsProjectId === projectId
    : projectId === firstId;

  return (
    <Link
      href={href}
      scroll={false}
      prefetch={true}
      className={cn(
        'flex grow justify-center rounded-lg bg-white/5 px-4 py-4',
        {
          'bg-primary': isActive,
        },
      )}
    >
      {children}
    </Link>
  );
};
