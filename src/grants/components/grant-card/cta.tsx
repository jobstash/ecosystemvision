import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { Grant } from '@/grants/core/types';
import { DiscordIcon } from '@/grants/components/ui/icons/discord-icon';
import { TwitterIcon } from '@/grants/components/ui/icons/twitter-icon';
import { WebIcon } from '@/grants/components/ui/icons/web-icon';

const icons = {
  url: WebIcon,
  discord: DiscordIcon,
  twitter: TwitterIcon,
};

type Props = Pick<Grant, 'logo' | 'url' | 'discord' | 'twitter'>;

export const GrantCardCTA = ({ logo, url, discord, twitter }: Props) => {
  const links = { url, discord, twitter };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex size-32 items-center justify-center bg-white/5">
        <span>LOGO HERE: {logo}</span>
      </div>
      <div className="flex items-center gap-3">
        {Object.entries(links).map(([key, value]) => {
          if (!value) return null;
          const IconComponent = icons[key as keyof typeof icons];
          return (
            <Button key={key} size="sm" as={Link} href={value} isIconOnly>
              <IconComponent />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
