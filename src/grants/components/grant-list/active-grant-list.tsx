'use client';

import { useEffect } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import {
  aiGrantFinderPending,
  aiGrantFinderQueryAtom,
} from '@/grants/core/atoms';
import { GrantListItems } from '@/grants/components/grant-list/grant-list-items';
import { useAiGrantList } from '@/grants/components/grant-list/use-ai-grant-list';

import { useGrantList } from './use-grant-list';

const FetchedGrantList = () => {
  const props = useGrantList('active');
  return <GrantListItems isLink={false} {...props} ctaText="Apply" />;
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

  return <GrantListItems isLink={false} {...props} />;
};

export const ActiveGrantList = () => {
  const aiQuery = useAtomValue(aiGrantFinderQueryAtom);
  return aiQuery ? <AiGrantList /> : <FetchedGrantList />;
};
