import { PageScrollDisableSyncer } from '@/shared/components/page-scroll-syncer';

import { DetailsPanelBackButton } from './back-button';

interface Props {
  backHref: string;
  children: React.ReactNode;
}

export const DetailsPanelLayout = ({ backHref, children }: Props) => {
  return (
    <div className="hide-scrollbar fixed right-0 top-24 z-20 h-screen w-screen overflow-auto bg-[#191919] pt-[68px]  md:pt-20 lg:w-[calc((100%-264px)/2)] lg:pt-0">
      <div className="flex flex-col gap-4 p-5 lg:p-6">
        <div className="lg:hidden">
          <DetailsPanelBackButton href={backHref} />
        </div>
        {children}
      </div>

      <PageScrollDisableSyncer shouldDisable />
    </div>
  );
};
