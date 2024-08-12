'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

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

  const href = `/grants/${params.grantId}/grantees/${granteeId}`;
  const isActive = isActiveBypass || params.granteeId === granteeId;

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
      {...props}
    >
      {children}
    </Link>
  );
};
