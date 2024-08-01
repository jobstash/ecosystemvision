import Link from 'next/link';

import { Avatar, AvatarGroup } from '@nextui-org/react';

import { formatNumber } from '@/shared/utils/format-number';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/types';

interface Props {
  grant: Omit<Grant, 'logo' | 'url' | 'discord' | 'twitter'>;
  cta: React.ReactNode;
}

export const GrantItem = (props: Props) => {
  const {
    grant: {
      id,
      name,
      grantees,
      networks,
      ecosystem,
      totalFunds,
      totalDisbursedFunds,
      summary,
      categories,
      type,
      reputations,
    },
    cta,
  } = props;

  const href = `/grants/${id}`;

  // TODO: JOB-679

  return (
    <Link
      href={href}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
      data-uuid={id}
      prefetch={true}
      className="flex items-center justify-between gap-6 rounded-lg bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
    >
      <div className="flex flex-col gap-3">
        <span>{name}</span>
        <div className="flex items-center gap-6">
          <span>{`Grantees ${grantees}`}</span>
          <div className="flex items-center gap-3">
            <span>Networks</span>
            <AvatarGroup size="sm">
              {networks.map(({ name, logo }) => (
                <Avatar
                  key={name}
                  showFallback
                  name={name}
                  src={logo ?? ''}
                  classNames={{
                    base: 'bg-zinc-700',
                    fallback: 'bg-white/5',
                  }}
                />
              ))}
            </AvatarGroup>
          </div>
          <span>{`Ecosystem ${ecosystem}`}</span>
          <span>{`Total Funds $${formatNumber(totalFunds)}`}</span>
          <span>{`Total Disbursed Funds $${formatNumber(totalDisbursedFunds)}`}</span>
        </div>

        <div className="flex items-start gap-4">
          <span>{summary}</span>
          <div className="flex shrink-0 items-center gap-4">
            <span>Categories</span>
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
          <div className="flex shrink-0 gap-4">
            <span>Type</span>
            <span className="">{type}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <span>Reputations</span>
          {reputations.map((reputation) => (
            <span key={reputation}>{reputation}</span>
          ))}
        </div>
      </div>

      {cta}
    </Link>
  );
};
