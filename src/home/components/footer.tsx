import Image from 'next/image';
import Link from 'next/link';

import { FarcasterIcon } from '@/home/components/icons/farcaster';
import { TelegramIcon } from '@/home/components/icons/telegram';
import { TwitterIcon } from '@/home/components/icons/twitter';

export const Footer = () => {
  return (
    <footer className="relative max-w-[1340px] px-5 pb-20 text-white md:px-10 lg:px-7 ">
      <Image
        src={'/ecosystem-logo.png'}
        alt={'Ecosystem.vision'}
        className=""
        width={178}
        height={26}
      />
      <ul className='flex gap-4 pb-12 pt-8 [&_svg]:w-4 [&_svg]:fill-white [&_svg]:stroke-white'>
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
      <ul className='flex flex-col gap-y-1 pb-12'>
        <li>
          <Link href={'/projects'}>Projects</Link>
        </li>
        <li>
          <Link href={'/organizations'}>Organizations</Link>
        </li>
        <li>
          <Link href={'/vc'}>VC</Link>
        </li>
        <li>
          <Link href={'/grants'}>Grants</Link>
        </li>
      </ul>
      <div className="border-t border-white pb-12 pt-6 text-13">© 2024 Ecosystem.vision</div>
      <ul className='flex flex-col gap-y-3'>
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
    </footer>
  );
};
