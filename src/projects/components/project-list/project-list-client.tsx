'use client';

import dynamic from 'next/dynamic';

const ProjectList = dynamic(() =>
  import('@/projects/components/project-list').then((m) => m.ProjectList),
);

interface Props {
  searchParams: string | Record<string, string>;
}

// TODO: Add rawSearchParams prop for filters
export const ProjectListClient = ({ searchParams }: Props) => {
  return <ProjectList searchParams={searchParams} />;
};
