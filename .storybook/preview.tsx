import '../src/app/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../src/app/swiper.css';

import type { Preview } from '@storybook/react';
import { HeroUIProvider } from '@/shared/providers/hero-ui-provider';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';
import { useEffect } from 'react';
import { grotesk, interTight } from '@/shared/core/fonts';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  <HeroUIProvider>
    <ReactQueryProvider queryClient={queryClient}>
      {children}
    </ReactQueryProvider>
  </HeroUIProvider>
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
    <div className={`${interTight.variable} ${grotesk.variable}`}>
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
