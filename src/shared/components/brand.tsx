import Link from 'next/link';

import { FRONTEND_URL } from '@/shared/core/envs';
import { EcosystemMark } from '@/shared/components/ecosystem-mark';

export const Brand = () => {
  return (
    <div className="flex h-16 items-center px-0 md:px-2">
      <Link
        aria-label="Ecosystem Vision home"
        className="group flex items-center gap-2.5"
        href={FRONTEND_URL}
      >
        <EcosystemMark className="size-11 transition-transform duration-300 group-hover:scale-105" />
        <span className="hidden font-grotesk text-lg font-medium leading-5 tracking-tight text-white md:block">
          ecosystem
          <span className="block text-white/45">vision</span>
        </span>
      </Link>
    </div>
  );
};
