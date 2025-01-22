'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { initialSelectedPillarItems } from './atoms';

interface Props {
  ssrSelectedItems: { label: string; pillar: string }[];
}

export const InitSelectedPillarItems = ({ ssrSelectedItems }: Props) => {
  const [initialItems, setInitialItems] = useAtom(initialSelectedPillarItems);

  useEffect(() => {
    if (initialItems.length === 0 && ssrSelectedItems.length > 0) {
      setInitialItems(ssrSelectedItems);
    }
  }, [initialItems.length, setInitialItems, ssrSelectedItems]);

  return <pre>{JSON.stringify({ ssrSelectedItems }, undefined, '\t')}</pre>;
};
