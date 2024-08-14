import Image from 'next/image';
import Link from 'next/link';

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
      <ul>
        <li>
          <Link href={'https://www.twitter.com'}>Twitter</Link>
        </li>
        <li>
          <Link href={'https://www.telegram.com'}>Telegram</Link>
        </li>
        <li>
          <Link href={'https://www.farcaster.com'}>Farcaster</Link>
        </li>
      </ul>
      <ul>
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
      <div className="border-t border-white">© 2024 Ecosystem.vision</div>
      <ul>
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
