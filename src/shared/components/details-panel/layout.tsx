import { MobileHeader } from '@/shared/components/mobile-header';
import { PageScrollDisableSyncer } from '@/shared/components/page-scroll-syncer';

import { DetailsPanelBackButton } from './back-button';

interface Props {
  backHref: string;
  children: React.ReactNode;
}

export const DetailsPanelLayout = ({ backHref, children }: Props) => {
  return (
    <div className="hide-scrollbar fixed right-0 top-0 z-20 size-full min-h-screen overflow-y-auto bg-darkest-gray pt-[68px] md:w-[calc((100%-212px))] md:pt-20 lg:w-[calc((100%-212px)/2)] lg:pt-0">
      <MobileHeader
        left={<DetailsPanelBackButton href={backHref} />}
        className="z-50 bg-darkest-gray md:left-auto md:right-0 md:flex md:w-[calc((100%-220px))] lg:hidden"
      />
      <div className="flex flex-col gap-4 p-5 lg:p-6">{children}</div>

      <PageScrollDisableSyncer shouldDisable />
    </div>
  );
};
