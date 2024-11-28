import React from 'react';

import { Brand } from '@/shared/components/brand';
import { MenuButton } from '@/shared/components/menu-button';

import { HeaderLinks } from './header-links';

interface Props {
  input?: React.ReactNode;
  mainPillar?: React.ReactNode;
  searchResults?: React.ReactNode;
}

export const AppHeader = (props: Props) => {
  const { input, mainPillar, searchResults } = props;
  return (
    <div className="sticky top-0 z-50 space-y-4">
      <div className="flex flex-col gap-4 bg-neutral-900 px-4 py-2 lg:py-4">
        <div className="flex min-h-16 flex-wrap items-center gap-8">
          <div className="order-1 shrink-0 lg:hidden">
            <Brand />
          </div>

          {/* Search Input */}
          <div className="order-3 w-full grow lg:order-2 lg:w-auto">
            {input}
          </div>

          {/* Header Links and Menu */}
          <div className="order-2 flex grow justify-end gap-4 lg:grow-0">
            <HeaderLinks />
            <MenuButton />
          </div>
        </div>

        {searchResults}

        {mainPillar}
      </div>
    </div>
  );
};
