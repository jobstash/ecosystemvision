import Image from 'next/image';
import Link from 'next/link';

import { FRONTEND_URL } from '@/shared/core/envs';
import { cn } from '@/shared/utils/cn';

const BRAND_NAME = 'veri';

export const Brand = () => {
  return (
    <div className="flex h-16 items-center gap-1 px-0 md:gap-3 md:px-4">
      <Link href={FRONTEND_URL}>
        <div className="md:ml-[-12px]">
          <Image
            priority
            width={48}
            height={48}
            quality={100}
            src="/veri-logo.png"
            alt="Ecosystem Vision Logo"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>
      <div className="hidden flex-col justify-center md:flex">
        <Link
          href={FRONTEND_URL}
          className={cn(
            '-ml-1',
            'bg-300% bg-gradient-to-r from-[#11c1ef] via-[#45f4d0] to-[#a1fe43] bg-clip-text text-transparent',
            'animate-gradient-text',
            'text-4xl font-bold leading-none tracking-wider md:text-3xl',
          )}
        >
          {BRAND_NAME}
        </Link>
      </div>
    </div>
  );
};
