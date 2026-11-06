import '../src/app/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../src/app/swiper.css';

import type { Preview } from '@storybook/react';
import { AppRouterProvider } from '@/shared/providers/app-router-provider';
import { PendingRouteProvider } from '@/shared/contexts/pending-route-context';
import { setupWorker } from 'msw/browser';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';
import { useEffect } from 'react';
import { grotesk, inter } from '@/shared/core/fonts';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const loaders: Preview['loaders'] = [
  mswLoader(async () => {
    const worker = setupWorker();
    worker.events.on('request:unhandled', ({ request }) => {
      if (new URL(request.url).pathname.startsWith('/api')) {
        console.error(`Unhandled ${request.method} request to "${request.url}"`);
      }
    });
    await worker.start({ onUnhandledFrame: 'bypass' });
    return worker;
  }),
];

const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    options: {
      default: { name: 'default', value: '#070708' },
    },
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
  <AppRouterProvider>
    <ReactQueryProvider queryClient={queryClient}>
      <PendingRouteProvider>{children}</PendingRouteProvider>
    </ReactQueryProvider>
  </AppRouterProvider>
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
    <div className={`dark ${inter.variable} ${grotesk.variable}`}>
      <Providers>
        <Story />
        <ClearReactQuery />
      </Providers>
    </div>
  ),
];

const preview: Preview = {
  parameters,
  initialGlobals: {
    backgrounds: { value: 'default' },
  },
  decorators,
  loaders,
};

export default preview;
