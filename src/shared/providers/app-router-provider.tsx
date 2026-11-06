'use client';

import { useRouter } from 'next/navigation';

import { RouterProvider } from '@heroui/react';

export const AppRouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <main>{children}</main>
    </RouterProvider>
  );
};

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}
