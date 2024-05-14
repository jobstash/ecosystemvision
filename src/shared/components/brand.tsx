import Image from 'next/image';
import Link from 'next/link';

const IMAGE_SRC = '/jobstash-nav-brand.png';
const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 32;
const MIN_HEIGHT_STYLE = { minHeight: 53 };

export const Brand = () => {
  return (
    <Link href="/">
      <div
        className="flex items-center justify-center"
        style={MIN_HEIGHT_STYLE}
      >
        <Image
          src={IMAGE_SRC}
          alt="JobStash Logo"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          priority
          quality={100}
        />
      </div>
    </Link>
  );
};
