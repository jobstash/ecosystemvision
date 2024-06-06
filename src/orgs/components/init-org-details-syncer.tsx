'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { activeOrgSlugAtom, initOrgAtom } from '@/orgs/core/atoms';
import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  slug: string;
}

export const InitOrgDetailsSyncer = ({ slug }: Props) => {
  const [activeOrgSlug, setActiveOrgSlug] = useAtom(activeOrgSlugAtom);
  const [initOrg, setInitOrg] = useAtom(initOrgAtom);

  const isDesktop = useIsDesktop();

  const { data } = useOrgDetails(slug);

  // Initialize org details
  useEffect(() => {
    if (!initOrg && data) {
      setInitOrg(data);
    }
  }, [data, initOrg, setInitOrg]);

  // Set active org slug on desktop
  useEffect(() => {
    if (isDesktop && !activeOrgSlug && data) {
      setActiveOrgSlug(data.normalizedName);
    }
  }, [activeOrgSlug, data, isDesktop, setActiveOrgSlug]);

  return null;
};
