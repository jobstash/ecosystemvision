'use client';

import { useRouter } from 'next/navigation';

import { NextUIProvider as BaseProvider } from '@nextui-org/system';

export const NextUIProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <BaseProvider navigate={router.push}>
      <main>{children}</main>
    </BaseProvider>
  );
};
