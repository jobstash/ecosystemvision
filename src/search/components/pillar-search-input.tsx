'use client';

import { useEffect, useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Spinner } from "@heroui/spinner";

import { cn } from '@/shared/utils/cn';
import { DraggableWrapper } from '@/shared/components/draggable-wrapper';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { GetPillarInputLabelsProps } from '@/search/core/types';
import { usePillarInputLabels } from '@/search/hooks/use-pillar-input-labels';
import { PillarSearchInputItem } from '@/search/components/pillar-search-input-item';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

export const PillarSearchInput = ({
  nav,
  pillars,
  inputs,
}: GetPillarInputLabelsProps) => {
  const { isPendingPillarRoute } = usePillarRoutesContext();
  const { data } = usePillarInputLabels({ nav, pillars, inputs });
  const [items, setItems] = useState<
    {
      label: string | null;
      slug: string;
      href: string;
      pillarSlug: string;
    }[]
  >([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setItems(data);
    }
  }, [data, setItems]);

  const [animateRef] = useAutoAnimate();

  const hasInputPillarItems = inputs.length > 0;
  const isLoading = (isPendingPillarRoute || !data) && hasInputPillarItems;
  const icon = isLoading ? <Spinner size="sm" color="white" /> : <SearchIcon />;

  return (
    <div
      className={cn(
        'flex h-12 w-fit min-w-96 max-w-6xl items-center gap-4 rounded-xl bg-white/10 px-3',
        { 'opacity-60 pointer-events-none': isLoading },
      )}
    >
      <div className="flex h-full w-6 shrink-0 items-center justify-center">
        {icon}
      </div>

      {items && items.length > 0 && (
        <DraggableWrapper>
          <div ref={animateRef} className="flex items-center gap-x-4">
            {items.map(({ slug, label, href, pillarSlug }) => (
              <PillarSearchInputItem
                key={slug}
                slug={slug}
                label={label}
                href={href}
                pillarSlug={pillarSlug}
              />
            ))}
          </div>
        </DraggableWrapper>
      )}
    </div>
  );
};
