import Image from 'next/image';
import Link from 'next/link';

const MIN_HEIGHT_STYLE = { minHeight: 53 };

export const Brand = () => {
  return (
    <Link href="/">
      <div
        className="flex items-center justify-center"
        style={MIN_HEIGHT_STYLE}
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
