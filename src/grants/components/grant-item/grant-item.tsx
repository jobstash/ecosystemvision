import Link from 'next/link';

import { Avatar, AvatarGroup, Button } from '@nextui-org/react';

import { formatNumber } from '@/shared/utils/format-number';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/types';
import { DiscordIcon } from '@/grants/components/icons/discord-icon';
import { TwitterIcon } from '@/grants/components/icons/twitter-icon';
import { WebIcon } from '@/grants/components/icons/web-icon';

interface Props {
  grant: Grant;
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
      logo,
      url,
      discord,
      twitter,
    },
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

      <div className="flex flex-col gap-3">
        <div className="flex size-32 items-center justify-center bg-white/5">
          <span>LOGO HERE: {logo}</span>
        </div>
        <div className="flex items-center gap-3">
          {url && (
            <Button size="sm" as={Link} href={url} isIconOnly>
              <WebIcon />
            </Button>
          )}
          {discord && (
            <Button size="sm" as={Link} href={discord} isIconOnly>
              <DiscordIcon />
            </Button>
          )}
          {twitter && (
            <Button size="sm" as={Link} href={twitter} isIconOnly>
              <TwitterIcon />
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};
