'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/utils/cn';

import { GRANT_TEST_IDS } from '@/grants/core/constants';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  granteeId: string;
  children: React.ReactNode;
}

export const ClientWrapper = ({
  granteeId,
  children,
  className,
  ...props
}: Props) => {
  const params = useParams();

  const href = `/grants/${params.grantId}/grantees/${granteeId}`;
  const isActive = params.granteeId === granteeId;

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
          'bg-gradient-to-l from-[#0D0D0D] to-primary': isActive,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
