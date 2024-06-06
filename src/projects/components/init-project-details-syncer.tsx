'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { activeProjectSlugAtom, initProjectAtom } from '@/projects/core/atoms';
import { useProjectDetails } from '@/projects/hooks/use-project-details';

interface Props {
  id: string;
}

export const InitProjectDetailsSyncer = ({ id }: Props) => {
  const [activeSlug, setActiveSlug] = useAtom(activeProjectSlugAtom);
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
    if (isDesktop && !activeSlug && data) {
      setActiveSlug(data.normalizedName);
    }
  }, [activeSlug, data, isDesktop, setActiveSlug]);

  return null;
};
