import { MobileHeader } from '@/shared/components/mobile-header';
import { PageScrollDisableSyncer } from '@/shared/components/page-scroll-syncer';

import { DetailsPanelBackButton } from './back-button';

interface Props {
  backHref: string;
  children: React.ReactNode;
}

export const DetailsPanelLayout = ({ backHref, children }: Props) => {
  return (
    <div className="hide-scrollbar fixed right-0 top-0 z-20 h-screen w-screen overflow-auto bg-[#191919] pt-[68px]  md:pt-20 lg:w-[calc((100%-264px)/2)] lg:pt-0">
      <MobileHeader
        left={<DetailsPanelBackButton href={backHref} />}
        className="z-50 bg-[#191919] md:left-auto md:right-0 md:flex md:w-[calc((100%-220px))] lg:hidden"
      />
      <div className="flex flex-col gap-4 p-5 lg:p-6">
        <div className='inline-flex w-fit cursor-pointer rounded-md border border-white/10 p-2 lg:hidden'>
          <DetailsPanelBackButton href={backHref} />
        </div>
        {children}
      </div>

      <PageScrollDisableSyncer shouldDisable />
    </div>
  );
};
