import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { PillarSearchInputItem } from '@/search/components/pillar-search-input-item';

interface Props {
  inputItems: { label: string; href: string }[];
}

export const PillarSearchInput = ({ inputItems }: Props) => {
  return (
    <div className="flex h-12 max-w-lg items-center gap-4 rounded-xl bg-white/10 px-3">
      <div className="shrink-0">
        <SearchIcon />
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
