'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { activeOrgIdAtom, initOrgAtom } from '@/orgs/core/atoms';
import { useOrgDetails } from '@/orgs/hooks/use-org-details';

interface Props {
  id: string;
}

export const InitOrgDetailsSyncer = ({ id }: Props) => {
  const [activeOrgId, setActiveOrgId] = useAtom(activeOrgIdAtom);
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
    if (isDesktop && !activeOrgId && data) {
      setActiveOrgId(data.orgId);
    }
  }, [activeOrgId, data, isDesktop, setActiveOrgId]);

  return null;
};