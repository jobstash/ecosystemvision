import { Button } from '@heroui/button';

import { Brand } from '@/shared/components/brand';
import { MenuButton } from '@/shared/components/menu-button';

import { BackButtonClientWrapper } from './back-button-client-wrapper';
import { AppHeaderProvider } from './context';
import { InputClientWrapper } from './input-client-wrapper';
import { SearchTriggerButton } from './search-trigger-button';

interface Props {
  input?: React.ReactNode;
  backButton?: React.ReactNode;
  initShowInput?: boolean;
  searchResults?: React.ReactNode;
}

export const AppHeader = (props: Props) => {
  const { input, backButton, initShowInput, searchResults } = props;
  const hasBackButton = !!backButton;

  return (
    <>
      <AppHeaderProvider
        initShowInput={initShowInput}
        hasBackButton={hasBackButton}
      >
        <div className="fixed z-50 flex min-h-16 w-full items-center gap-x-4 bg-cyan-600 px-4 lg:w-[calc(100%-236px)]">
          <div className="flex grow items-center gap-x-4">
            <div className="block lg:hidden">
              <Brand />
            </div>

            <BackButtonClientWrapper>{backButton}</BackButtonClientWrapper>

            <InputClientWrapper>{input}</InputClientWrapper>

            <SearchTriggerButton />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden gap-2 lg:flex">
              <Button variant="light">Get Listed</Button>
              <Button variant="light">Subscribe on TG</Button>
              <Button radius="sm" className="bg-white text-black">
                Connect Wallet
              </Button>
            </div>
            <MenuButton />
          </div>
        </div>
      </AppHeaderProvider>
      <div className="py-16">{searchResults}</div>
    </>
  );
};
