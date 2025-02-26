import Image from 'next/image';
import Link from 'next/link';

export const Brand = () => {
  return (
    <Link href="/">
      <div className="flex max-h-10 min-w-[174px] items-center justify-center">
        <Image
          src={'/ecosystem-logo.png'}
          alt={'Ecosystem.vision'}
          className="bg-transparent"
          width={178}
          height={26}
        />
      </div>
    </Link>
  );
};
