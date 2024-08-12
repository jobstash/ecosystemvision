'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn, Skeleton } from '@nextui-org/react';

import { useGranteeProject } from '@/grants/hooks/use-grantee-project';

const SHARED_CLASSNAME = 'flex w-full gap-4 p-4';

interface Props {
  defaultId: string;
  baseHref: string;
}

export const ProjectTabSelection = ({ defaultId, baseHref }: Props) => {
  const params = useParams();
  const projectId = (params.projectId as string) || defaultId;

  const { data } = useGranteeProject(projectId);
  if (!data) return <Skeleton className={cn(SHARED_CLASSNAME, 'h-14')} />;

  const activeTab = params.tab;
  if (!activeTab) return null;

  const tabs = data.data.tabs.map((t) => ({
    ...t,
    href: `${baseHref}/${projectId}/${t.tab}`,
  }));

  return (
    <div className={cn(SHARED_CLASSNAME, 'bg-white/5')}>
      {tabs.map(({ label, tab, href }) => (
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
          {label}
        </Link>
      ))}
    </div>
  );
};
