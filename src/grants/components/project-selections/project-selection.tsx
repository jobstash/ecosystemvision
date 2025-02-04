'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { sendGAEvent } from '@next/third-parties/google';

import { GA_EVENT } from '@/shared/core/constants';
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

  const sendAnalytics = () => {
    sendGAEvent('event', GA_EVENT.GRANTS.GRANTEE_PROJECT_SELECTION, {
      value: name,
    });
  };

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
      onClick={sendAnalytics}
    >
      {name}
    </Link>
  );
};
