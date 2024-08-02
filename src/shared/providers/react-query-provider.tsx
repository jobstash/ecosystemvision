'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

export const ReactQueryProvider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient?: QueryClient;
}) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const client = queryClient || getQueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
