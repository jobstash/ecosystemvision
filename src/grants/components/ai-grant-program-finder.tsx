'use client';

import { createPortal } from 'react-dom';

import { Button, Textarea } from '@nextui-org/react';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { GRANTS_PORTAL_IDS } from '@/grants/core/constants';

export const AiGrantProgramFinder = () => {
  const isMounted = useIsMounted();
  const isDesktop = useIsDesktop();

  const portalId = isDesktop
    ? GRANTS_PORTAL_IDS.AI_FINDER_DESKTOP
    : GRANTS_PORTAL_IDS.AI_FINDER_MOBILE;

  const portal =
    typeof window === 'undefined' ? null : document.getElementById(portalId);

  if (!isMounted || !portal) return null;

  return createPortal(
    <div className="mt-8 flex h-full flex-col gap-4 rounded-20 border border-white/10 p-4 lg:mt-0">
      <h2 className="text-xl font-semibold">AI Grant Program Finder</h2>
      <span className="text-sm">
        Our AI assistant will help you identify which grant program suits your
        application best
      </span>
      <Textarea
        classNames={{
          base: 'grow',
          inputWrapper: 'h-full bg-white/5 grow rounded-lg',
          input: 'placeholder:text-white placeholder:text-sm text-base',
        }}
        placeholder="Describe your project here"
      />
      <Button className="is-active mx-auto w-full rounded-lg text-sm font-semibold text-black">
        <span>Find</span>
      </Button>
    </div>,
    portal,
  );
};
