'use client';

import { useEffect } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { GA_EVENT } from '@/shared/core/constants';

import {
  aiGrantFinderPending,
  aiGrantFinderQueryAtom,
} from '@/grants/core/atoms';
import { GrantListItems } from '@/grants/components/grant-list/grant-list-items';
import { useAiGrantList } from '@/grants/components/grant-list/use-ai-grant-list';

import { useGrantList } from './use-grant-list';

const FetchedGrantList = () => {
  const props = useGrantList('active');

  const gaEvent = GA_EVENT.GRANTS.APPLY_ACTIVE_GRANT;
  return <GrantListItems isInfo gaEvent={gaEvent} {...props} />;
};

const AiGrantList = () => {
  const props = useAiGrantList();
  const [isPending, setIsPending] = useAtom(aiGrantFinderPending);

  // Sync pending
  useEffect(() => {
    if (isPending !== props.isPending) {
      setIsPending(props.isPending);
    }
  }, [isPending, props.isPending, setIsPending]);

  const gaEvent = GA_EVENT.GRANTS.APPLY_AI_ACTIVE_GRANT;
  return <GrantListItems isInfo gaEvent={gaEvent} {...props} />;
};

export const ActiveGrantList = () => {
  const aiQuery = useAtomValue(aiGrantFinderQueryAtom);
  return aiQuery ? <AiGrantList /> : <FetchedGrantList />;
};
