'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { activeProjectIdAtom, initProjectAtom } from '../core/atoms';
import { useProjectDetails } from '../hooks/use-project-details';

interface Props {
  id: string;
}

export const InitProjectDetailsSyncer = ({ id }: Props) => {
  const [activeId, setActiveId] = useAtom(activeProjectIdAtom);
  const [initProject, setInitProject] = useAtom(initProjectAtom);

  const isDesktop = useIsDesktop();

  const { data } = useProjectDetails(id);

  // Initialize project details
  useEffect(() => {
    if (!initProject && data) {
      setInitProject(data);
    }
  }, [data, initProject, setInitProject]);

  // Set active project ID on desktop
  useEffect(() => {
    if (isDesktop && !activeId && data) {
      setActiveId(data.id);
    }
  }, [activeId, data, isDesktop, setActiveId]);

  return null;
};
