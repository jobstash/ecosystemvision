'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Spinner } from '@nextui-org/spinner';

import { cn } from '@/shared/utils/cn';
import { DraggableWrapper } from '@/shared/components/draggable-wrapper';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { TPillarItem } from '@/search/core/types';
import { PillarSearchInputItem } from '@/search/components/pillar-search-input-item';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  inputItems: TPillarItem[];
}

export const PillarSearchInput = ({ inputItems }: Props) => {
  const { isPendingPillarRoute } = usePillarRoutesContext();

  const [animateRef] = useAutoAnimate();

  const icon = isPendingPillarRoute ? (
    <Spinner size="sm" color="white" />
  ) : (
    <SearchIcon />
  );

  return (
    <div
      className={cn(
        'flex h-12 w-fit min-w-96 max-w-6xl items-center gap-4 rounded-xl bg-white/10 px-3',
        { 'opacity-60 pointer-events-none': isPendingPillarRoute },
      )}
    >
      <div className="flex h-full w-6 shrink-0 items-center justify-center">
        {icon}
      </div>

      {inputItems.length > 0 && (
        <DraggableWrapper>
          <div ref={animateRef} className="flex items-center gap-x-4">
            {inputItems.map(({ label, href }) => (
              <PillarSearchInputItem key={label} label={label} href={href} />
            ))}
          </div>
        </DraggableWrapper>
      )}
    </div>
  );
};
