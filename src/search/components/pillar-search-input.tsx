'use client';

import { Spinner } from '@nextui-org/spinner';

import { cn } from '@/shared/utils/cn';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { TPillarItem } from '@/search/core/types';
import { PillarSearchInputItem } from '@/search/components/pillar-search-input-item';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  inputItems: TPillarItem[];
}

export const PillarSearchInput = ({ inputItems }: Props) => {
  const { isPendingPillarRoute } = usePillarRoutesContext();

  const icon = isPendingPillarRoute ? (
    <Spinner size="sm" color="white" />
  ) : (
    <SearchIcon />
  );

  return (
    <div
      className={cn(
        'flex h-12 max-w-lg items-center gap-4 rounded-xl bg-white/10 px-3',
        { 'opacity-60 pointer-events-none': isPendingPillarRoute },
      )}
    >
      <div className="flex h-full w-6 shrink-0 items-center justify-center">
        {icon}
      </div>

      {inputItems.length > 0 && (
        <div className="flex items-center gap-x-4">
          {inputItems.map(({ label, href }) => (
            <PillarSearchInputItem key={label} label={label} href={href} />
          ))}
        </div>
      )}

      {/* {inputItems.length < 2 && (
        <Input
          placeholder="Search ..."
          classNames={{
            base: 'p-0',
            input: 'bg-transparent',
            inputWrapper:
              'p-0 bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group-data-[focus=true]:bg-transparent',
          }}
        />
      )} */}
    </div>
  );
};
