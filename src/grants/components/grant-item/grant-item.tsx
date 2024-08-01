import Link from 'next/link';

import { cn } from '@/shared/utils/cn';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/types';

import { GrantItemContent } from './content';

const WRAPPER_CLASSNAME =
  'flex items-center justify-between gap-6 rounded-lg p-6';

const CARD_CLASSNAME = 'bg-gradient-to-l from-[#0D0D0D] to-primary';

const LINK_CLASSNAME =
  'bg-white/5 transition-all duration-300 hover:bg-white/10';

interface Props {
  grant: Grant;
  cta: React.ReactNode;
  isCard?: boolean;
}

export const GrantItem = ({ isCard, grant, cta }: Props) => {
  // TODO: Complete JOB-679

  const href = `/grants/${grant.id}`;

  const className = cn(
    WRAPPER_CLASSNAME,
    isCard ? CARD_CLASSNAME : LINK_CLASSNAME,
  );

  const content = <GrantItemContent grant={grant} cta={cta} />;

  const testProps = {
    'data-uuid': grant.id,
    'data-testid': GRANT_TEST_IDS.GRANT_ITEM,
  };

  if (isCard) {
    return (
      <div className={className} {...testProps}>
        {content}
      </div>
    );
  }

  return (
    <Link prefetch href={href} className={className} {...testProps}>
      {content}
    </Link>
  );
};
