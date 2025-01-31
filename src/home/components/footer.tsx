import Image from 'next/image';
import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';

import { FarcasterIcon } from '@/home/components/icons/farcaster';
import { TelegramIcon } from '@/home/components/icons/telegram';
import { TwitterIcon } from '@/home/components/icons/twitter';

export const Footer = () => {
  return (
    <footer className="relative max-w-[1340px] px-5 pb-20 text-white md:px-10 lg:px-7 ">
      <div className="md:flex md:flex-wrap">
        <div className="md:w-1/2">
          <Image
            src={'/ecosystem-logo.png'}
            alt={'Ecosystem.vision'}
            className=""
            width={178}
            height={26}
          />
          <ul className="flex gap-4 pb-12 pt-8 [&_svg]:w-4 [&_svg]:fill-white [&_svg]:stroke-white">
            <li>
              <Link href={'https://www.twitter.com'}>
                <TwitterIcon />
              </Link>
            </li>
            <li>
              <Link href={'https://www.telegram.com'}>
                <TelegramIcon />
              </Link>
            </li>
            <li>
              <Link href={'https://www.farcaster.com'}>
                <FarcasterIcon />
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex flex-col gap-y-1 pb-12">
          <li>
            <Link href={HREFS.PROJECTS_PAGE}>Projects</Link>
          </li>
          <li>
            <Link href={HREFS.ORGS_PAGE}>Organizations</Link>
          </li>
          <li>
            <Link href={HREFS.GRANTS_PAGE}>Active Grants</Link>
          </li>
          <li>
            <Link href={HREFS.IMPACT_PAGE}>Grant Impact</Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-white md:flex md:items-center md:justify-between md:pt-6">
        <div className="pb-12 pt-6 text-13 md:py-0">
          © 2024 Ecosystem.vision
        </div>
        <ul className="flex flex-col gap-y-3 md:flex-row md:items-center md:gap-x-6">
          <li>
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={'/terms-of-service'}>Terms of Service</Link>
          </li>
          <li>
            <Link href={'/cookies-settings'}>Cookies Settings</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
