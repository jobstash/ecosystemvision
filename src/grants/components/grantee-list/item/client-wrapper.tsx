'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { sendGAEvent } from '@next/third-parties/google';

import { GA_EVENT, ROUTE_SECTIONS } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';

import { GRANT_TEST_IDS } from '@/grants/core/constants';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  granteeId: string;
  children: React.ReactNode;
  isActiveBypass?: boolean;
}

export const ClientWrapper = ({
  granteeId,
  isActiveBypass,
  children,
  className,
  ...props
}: Props) => {
  const params = useParams();

  const href = `/${ROUTE_SECTIONS.IMPACT}/${params.grantId}/grantees/${granteeId}`;
  const isActive = isActiveBypass || params.granteeId === granteeId;

  const sendAnalytics = () => {
    sendGAEvent('event', GA_EVENT.GRANTS.GRANTEE_ITEM_CLICK, {
      value: granteeId,
    });
  };

  return (
    <Link
      href={href}
      scroll={false}
      data-testid={GRANT_TEST_IDS.GRANTEE_ITEM}
      data-uuid={params.granteeId}
      prefetch={true}
      className={cn(
        'bg-white/5',
        {
          'is-active': isActive,
        },
        className,
      )}
      onClick={sendAnalytics}
      {...props}
    >
      {children}
    </Link>
  );
};
