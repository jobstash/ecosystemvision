import { cn } from '@/shared/utils/cn';
import { ExternalLinkButton } from '@/shared/components/external-link-button';

import { DiscordIcon } from '@/grants/components/ui/icons/discord-icon';
import { TwitterIcon } from '@/grants/components/ui/icons/twitter-icon';
import { WebIcon } from '@/grants/components/ui/icons/web-icon';

interface Props {
  links: Record<string, string | null>;
  classNames?: {
    root?: string;
    button?: string;
  };
}

const icons = {
  url: <WebIcon />,
  discord: <DiscordIcon />,
  twitter: <TwitterIcon />,
};

export const WebLinks = ({ links, classNames }: Props) => {
  return (
    <div className={cn('flex items-center gap-1', classNames?.root)}>
      {Object.entries(links).map(([key, value]) => {
        if (!value) return null;
        const icon = icons[key as keyof typeof icons];
        return (
          <ExternalLinkButton
            key={key}
            size="sm"
            isIconOnly
            className={cn(classNames?.button)}
            href={value}
          >
            {icon}
          </ExternalLinkButton>
        );
      })}
    </div>
  );
};
