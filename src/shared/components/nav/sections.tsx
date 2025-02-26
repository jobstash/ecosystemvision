import dynamic from 'next/dynamic';

import { A11Y, HREFS, TEST_IDS } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';
import { Brand } from '@/shared/components/brand';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { GRANTS_PORTAL_IDS } from '@/grants/core/constants';

import { Bartab } from './bartab';
import { CloseButton } from './close-button';

const AiGrantProgramFinderSkeleton = dynamic(
  () =>
    import(
      '@/grants/components/ai-grant-program-finder/ai-grant-program-finder-skeleton'
    ).then((m) => m.AiGrantProgramFinderSkeleton),
  { ssr: true },
);

const SECTIONS = [
  {
    label: 'Discover',
    bartabs: [
      {
        text: A11Y.LINK.NAV.ORGS,
        href: HREFS.ORGS_PAGE,
      },
      {
        text: A11Y.LINK.NAV.PROJECTS,
        href: HREFS.PROJECTS_PAGE,
      },
      {
        text: A11Y.LINK.NAV.GRANTS,
        href: HREFS.GRANTS_PAGE,
      },
      {
        text: A11Y.LINK.NAV.IMPACT,
        href: HREFS.IMPACT_PAGE,
      },
    ],
  },
];

interface Props {
  isMobile?: boolean;
}

export const NavSections = ({ isMobile }: Props) => {
  return (
    <nav className="h-full" data-testid={TEST_IDS.NAV_SECTION}>
      <div
        className={cn(
          'flex h-[122px] items-center justify-between',
          // { 'h-[104px]': isMobile },
        )}
      >
        <Brand />
        {isMobile && <CloseButton />}
      </div>

      <div className="flex flex-col gap-6">
        <Bartab
          text={A11Y.LINK.NAV.SEARCH}
          href={HREFS.SEARCH_PAGE}
          isMobile={isMobile}
          endContent={isMobile ? null : <SearchIcon />}
        />

        <Bartab
          text={A11Y.LINK.NAV.HOME}
          href={HREFS.HOME_PAGE}
          isMobile={isMobile}
        />

        {SECTIONS.map(({ label, bartabs }) => (
          <div key={label} className="flex flex-col gap-4">
            <h2 className="text-white/75 md:pb-0 md:text-xs md:text-[#9CA3AF]">
              {label}
            </h2>
            <div className="flex flex-col gap-4 px-2 md:gap-3 md:px-0">
              {bartabs.map(({ text, href }) => (
                <Bartab
                  key={text}
                  text={text}
                  href={href}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        ))}

        <div
          id={GRANTS_PORTAL_IDS.AI_FINDER_DESKTOP}
          className="w-full grow"
          style={{
            borderImageSource:
              'linear-gradient(162.12deg, #EAEAEA -14.01%, rgba(187, 190, 223, 0) 27.11%, rgba(132, 132, 132, 0) 62.3%, rgba(133, 133, 134, 0) 68.01%, #999999 92.7%)',
          }}
        >
          <AiGrantProgramFinderSkeleton isDesktop />
        </div>
      </div>
    </nav>
  );
};
