'use client';

import dynamic from 'next/dynamic';

const ProjectList = dynamic(() =>
  import('@/projects/components/project-list').then((m) => m.ProjectList),
);

// TODO: Add rawSearchParams prop for filters
export const ProjectListClientPage = () => {
  return <ProjectList searchParams={{}} />;
};
