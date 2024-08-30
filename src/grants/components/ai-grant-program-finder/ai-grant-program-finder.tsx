'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, Textarea } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { useIsDesktop } from '@/shared/hooks/use-media-query';
import { AiIcon } from '@/shared/components/icons/ai-icon';

import { GRANTS_PORTAL_IDS } from '@/grants/core/constants';
import {
  aiGrantFinderPending,
  aiGrantFinderQueryAtom,
} from '@/grants/core/atoms';

export const AiGrantProgramFinder = () => {
  const isMounted = useIsMounted();
  const isDesktop = useIsDesktop();

  const portalId = isDesktop
    ? GRANTS_PORTAL_IDS.AI_FINDER_DESKTOP
    : GRANTS_PORTAL_IDS.AI_FINDER_MOBILE;

  const portal =
    typeof window === 'undefined' ? null : document.getElementById(portalId);

  const isPending = useAtomValue(aiGrantFinderPending);
  const [aiQuery, setAiQuery] = useAtom(aiGrantFinderQueryAtom);

  const [aiQueryInput, setAiQueryInput] = useState('');
  const onChangeAiQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAiQueryInput(e.target.value);
  };

  const onFind = () => {
    setAiQuery(aiQueryInput);
  };

  const onClear = () => {
    setAiQuery('');
    setAiQueryInput('');
  };

  const buttonText = !!aiQuery && !isPending ? 'Reset' : 'Find';
  const onClick = aiQuery ? onClear : onFind;

  if (!isMounted || !portal) return null;

  return createPortal(
    <div className="mt-5 flex h-full flex-col gap-4 rounded-20 border border-white/10 p-4 md:mt-6 lg:mt-0">
      <h2 className="text-xl font-semibold">AI Grant Program Finder</h2>
      <span className="text-sm">
        Our AI assistant will help you identify which grant program suits your
        application best
      </span>
      <Textarea
        isDisabled={isPending}
        value={aiQuery || aiQueryInput}
        onChange={onChangeAiQuery}
        classNames={{
          base: 'grow',
          inputWrapper: 'h-full bg-white/5 grow rounded-lg',
          input: 'placeholder:text-cool-gray placeholder:text-sm text-base',
        }}
        placeholder="Describe your project here"
      />
      <Button
        isLoading={isPending}
        isDisabled={!aiQueryInput && !aiQuery}
        className="is-active mx-auto w-full rounded-lg text-sm font-semibold text-black"
        onClick={onClick}
      >
        <AiIcon />
        <span className="-ml-1">{buttonText}</span>
      </Button>
    </div>,
    portal,
  );
};
