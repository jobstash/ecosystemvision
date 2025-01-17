'use client';

import { useRouter } from 'next/navigation';

import { HeroUIProvider as BaseProvider } from '@heroui/react';

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <BaseProvider navigate={router.push}>
      <main>{children}</main>
    </BaseProvider>
  );
};
