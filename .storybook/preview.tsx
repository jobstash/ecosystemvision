import '../src/app/globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { Preview } from '@storybook/react';
import { NextUIProvider } from '@/shared/providers/next-ui-provider';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';
import { useEffect, useReducer } from 'react';

// Initialize MSW
initialize({
  onUnhandledRequest({ method, url }) {
    if (url.startsWith('/api')) {
      console.error(`Unhandled ${method} request to "${url}"`);
    }
  },
});

const loaders: Preview['loaders'] = [mswLoader];

const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: 'default',
    values: [{ name: 'default', value: '#070708' }],
  },
  nextjs: {
    appDirectory: true,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider>
    <ReactQueryProvider queryClient={queryClient}>
      {children}
    </ReactQueryProvider>
  </NextUIProvider>
);

const ClearReactQuery = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.resetQueries();
    };
  }, []);

  return null;
};

const decorators: Preview['decorators'] = [
  (Story) => (
    <div className="min-h-screen">
      <Providers>
        <Story />
        <ClearReactQuery />
      </Providers>
    </div>
  ),
];

const preview: Preview = {
  parameters,
  decorators,
  loaders,
};

export default preview;
