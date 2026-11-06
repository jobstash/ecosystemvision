'use client';

import { useMemo } from 'react';

import { Avatar, AvatarGroup, Tooltip } from '@heroui/react';

import { Chain } from '@/shared/core/schemas';
import { getPluralText } from '@/shared/utils/get-plural-text';
import { useIsMobile, useIsXs } from '@/shared/hooks/use-media-query';

import { ChainsIcon } from './icons/chains-icon';
import { InfoTag } from './info-tag';
import { Text } from './text';

const CHAIN_COUNTS = {
  XS: 6,
  SM: 8,
  DEFAULT: 12,
} as const;

const AvatarGroupCount = ({ count }: { count: number }) => (
  <Tooltip>
    <Tooltip.Trigger tabIndex={0} className="z-10 ml-[-10px] flex size-[30px] items-center justify-center rounded-full bg-[#E5ECF6]">
      <Text className="text-sm text-black" text={`+${count}`} />
    </Tooltip.Trigger>
    <Tooltip.Content>{`${count} other ${getPluralText('chain', count)}`}</Tooltip.Content>
  </Tooltip>
);

interface Props {
  chains: Chain[];
  max?: number;
}

export const ChainsInfoTag = ({ chains, max }: Props) => {
  const isXs = useIsXs();
  const isSm = useIsMobile();

  const maxChainCount = useMemo(() => {
    if (max) return max;
    if (isXs) return CHAIN_COUNTS.XS;
    if (isSm) return CHAIN_COUNTS.SM;
    return CHAIN_COUNTS.DEFAULT;
  }, [max, isXs, isSm]);

  if (!chains.length) return null;

  const tag = { text: 'Chains:', icon: <ChainsIcon /> };

  return (
    <div className="flex items-center gap-1">
      <InfoTag isCompact tag={tag} />

      <AvatarGroup>
        {chains.slice(0, maxChainCount).map(({ name, logo }) => (
          <Tooltip key={name}>
            <Tooltip.Trigger tabIndex={0}>
              <Avatar className="h-7 w-7 text-red-500">
                <Avatar.Image src={logo ?? ''} alt={name} />
                <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
              </Avatar>
            </Tooltip.Trigger>
            <Tooltip.Content className="font-medium text-white">{name}</Tooltip.Content>
          </Tooltip>
        ))}
        {chains.length > maxChainCount && <AvatarGroupCount count={chains.length - maxChainCount} />}
      </AvatarGroup>
    </div>
  );
};
