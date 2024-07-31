'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@nextui-org/react';

import { ROUTE_TABS } from '@/shared/core/constants';

interface Project {
  id: string;
  name: string;
  summary: string;
  impactMetrics: string;
  githubMetrics: string;
  codeMetrics: string;
  contactAddress: string;
}
interface Props {
  projects: Project[];
  baseHref: string;
}

const tabConfig = [
  { key: 'summary', text: 'Overall Summary', tab: 'summary' },
  { key: 'impactMetrics', text: 'Impact Metrics', tab: 'impact-metrics' },
  { key: 'githubMetrics', text: 'Github Metrics', tab: 'github-metrics' },
  { key: 'codeMetrics', text: 'Code Metrics', tab: 'code-metrics' },
  { key: 'contactAddress', text: 'Contact Address', tab: 'contact' },
];

const createTabs = (project: Project, baseHref: string, projectId: string) => {
  const hrefPrefix = `${baseHref}/${projectId}`;
  return tabConfig
    .filter((config) => project[config.key as keyof Project])
    .map(({ text, tab }) => ({
      text,
      href: `${hrefPrefix}/${tab}`,
      tab,
    }));
};

export const ProjectTabSelection = ({ projects, baseHref }: Props) => {
  const params = useParams();

  const projectId = params.projectId || projects[0].id;
  const activeTab = params.tab || ROUTE_TABS.GRANTS.SUMMARY;
  const project = projects.find((project) => project.id === projectId);

  const tabs = useMemo(() => {
    if (!project) return [];
    return createTabs(project, baseHref, projectId as string);
  }, [baseHref, project, projectId]);

  if (projects.length === 0 || !project) return null;

  if (!tabs) return null;

  return (
    <div className="flex w-full gap-4 bg-white/5 p-4">
      {tabs.map(({ text, href, tab }) => (
        <Link
          key={href}
          href={href}
          scroll={false}
          prefetch={true}
          className={cn('flex grow justify-center rounded-lg px-4 py-4', {
            'bg-white/5': activeTab !== tab,
            'bg-primary': activeTab === tab,
          })}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};
