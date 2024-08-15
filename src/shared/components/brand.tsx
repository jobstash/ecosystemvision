import Image from 'next/image';
import Link from 'next/link';

export const Brand = () => {
  return (
    <Link href="/">
      <div
        className="flex items-center justify-center"
      >
        <Image
          src={'/ecosystem-logo.png'}
          alt={'Ecosystem.vision'}
          className=""
          width={178}
          height={26}
        />
      </div>
    </Link>
  );
};
