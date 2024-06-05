'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { activeOrgSlugAtom, initOrgAtom } from '@/orgs/core/atoms';
import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  id: string;
}

export const InitOrgDetailsSyncer = ({ id }: Props) => {
  const [activeOrgSlug, setActiveOrgSlug] = useAtom(activeOrgSlugAtom);
  const [initOrg, setInitOrg] = useAtom(initOrgAtom);

  const isDesktop = useIsDesktop();

  const { data } = useOrgDetails(id);

  // Initialize org details
  useEffect(() => {
    if (!initOrg && data) {
      setInitOrg(data);
    }
  }, [data, initOrg, setInitOrg]);

  // Set active org ID on desktop
  useEffect(() => {
    if (isDesktop && !activeOrgSlug && data) {
      setActiveOrgSlug(data.normalizedName);
    }
  }, [activeOrgSlug, data, isDesktop, setActiveOrgSlug]);

  return null;
};
