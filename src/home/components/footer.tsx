import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';
import { EcosystemMark } from '@/shared/components/ecosystem-mark';

import { FarcasterIcon } from '@/home/components/icons/farcaster';
import { TelegramIcon } from '@/home/components/icons/telegram';
import { TwitterIcon } from '@/home/components/icons/twitter';

export const Footer = () => {
  return (
    <footer className="relative max-w-[1340px] px-5 pb-20 text-white md:px-10 lg:px-7 ">
      <div className="md:flex md:flex-wrap">
        <div className="md:w-1/2">
          <Link className="inline-flex items-center gap-3" href={HREFS.HOME_PAGE}>
            <EcosystemMark className="size-10" />
            <span className="font-grotesk text-xl font-medium">
              ecosystem.vision
            </span>
          </Link>
          <ul className="flex gap-4 pb-12 pt-8 [&_svg]:w-4 [&_svg]:fill-white [&_svg]:stroke-white">
            <li>
              <Link
                aria-label="Ecosystem Vision on X"
                href="https://x.com/jobstash_xyz"
                rel="external noopener"
                target="_blank"
              >
                <TwitterIcon />
              </Link>
            </li>
            <li>
              <Link
                aria-label="Ecosystem Vision on Telegram"
                href="https://telegram.me/jobstash"
                rel="external noopener"
                target="_blank"
              >
                <TelegramIcon />
              </Link>
            </li>
            <li>
              <Link
                aria-label="Ecosystem Vision on Farcaster"
                href="https://farcaster.xyz/~/channel/jobstash"
                rel="external noopener"
                target="_blank"
              >
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
            <Link href={HREFS.FUNDS_PAGE}>Funds</Link>
          </li>
          <li>
            <Link href={HREFS.PEOPLE_PAGE}>People</Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-white md:flex md:items-center md:justify-between md:pt-6">
        <div className="pb-12 pt-6 text-13 md:py-0">
          © {new Date().getFullYear()} Ecosystem.vision
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
