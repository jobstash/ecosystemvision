import { A11Y, HREFS, TEST_IDS } from '@/shared/core/constants';
import { Brand } from '@/shared/components/brand';
import { HandbagIcon } from '@/shared/components/icons/handbag-icon';
import { UsersThreeIcon } from '@/shared/components/icons/users-three-icon';

import { SquareIcon } from '../icons/square-icon';

import { Bartab } from './bartab';
import { CloseButton } from './close-button';

const SECTIONS = [
  {
    label: 'Discover',
    bartabs: [
      {
        icon: <HandbagIcon />,
        text: A11Y.LINK.NAV.ORGS,
        href: HREFS.ORGS_PAGE,
      },
      {
        icon: <UsersThreeIcon />,
        text: A11Y.LINK.NAV.PROJECTS,
        href: HREFS.PROJECTS_PAGE,
      },
      {
        icon: <SquareIcon />,
        text: A11Y.LINK.NAV.INVESTORS,
        href: HREFS.INVESTORS_PAGE,
      },
      {
        icon: <SquareIcon />,
        text: A11Y.LINK.NAV.COMMUNITIES,
        href: HREFS.COMMUNITIES_PAGE,
      },
      {
        icon: <SquareIcon />,
        text: A11Y.LINK.NAV.CHAINS,
        href: HREFS.CHAINS_PAGE,
      },
    ],
  },
];

interface Props {
  isMobile?: boolean;
}

export const NavSections = ({ isMobile }: Props) => {
  return (
    <nav
      className="flex flex-col gap-6 md:w-[180px] md:gap-12"
      data-testid={TEST_IDS.NAV_SECTION}
    >
      <div className="flex items-center justify-between">
        <Brand />
        {isMobile && <CloseButton />}
      </div>

      {SECTIONS.map(({ label, bartabs }) => (
        <div key={label} className="flex flex-col gap-4">
          <h2 className="text-white/75 md:pb-0 md:text-xs md:text-[#9CA3AF]">
            {label}
          </h2>
          <div className="flex flex-col gap-4 px-2 md:gap-3 md:px-0">
            {bartabs.map(({ text, icon, href }) => (
              <Bartab
                key={text}
                icon={icon}
                text={text}
                href={href}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
