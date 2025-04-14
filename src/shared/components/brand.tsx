import Image from 'next/image';
import Link from 'next/link';

import { FRONTEND_URL, VERI_URL } from '@/shared/core/envs';

const BRAND_NAME = 'Ecosystem Vision';
const VERI_LABEL = 'veri.xyz';

export const Brand = () => {
  return (
    <div className="flex h-16 items-center gap-1 px-0 md:gap-3 md:px-4">
      <Link href={FRONTEND_URL}>
        <Image
          priority
          width={32}
          height={32}
          quality={100}
          src="/header-image.jpg"
          alt="Ecosystem Vision Logo"
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <div className="hidden flex-col justify-center md:flex">
        <Link
          href={FRONTEND_URL}
          className="mt-1 text-14 font-bold leading-4 md:mt-0"
        >
          {BRAND_NAME}
        </Link>
        <span className="text-10 leading-snug text-white/40 md:text-xs">
          by
          <Link
            href={VERI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 hover:underline"
          >
            {VERI_LABEL}
          </Link>
        </span>
      </div>
    </div>
  );
};
