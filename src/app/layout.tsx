import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';

import type { Metadata } from 'next';

import { GoogleAnalytics } from '@next/third-parties/google';

import { GOOGLE_ANALYTICS_ID } from '@/shared/core/envs';
import { grotesk, inter } from '@/shared/core/fonts';
import { InitPathSyncer } from '@/shared/components/init-path-syncer';
import { NavLayout } from '@/shared/components/nav-space-layout';
import { PageScrollDisabler } from '@/shared/components/page-scroll-disabler';
import { HeroUIProvider } from '@/shared/providers/hero-ui-provider';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';

import { Toaster } from '@/grants/components/toaster';

export const metadata: Metadata = {
  title: 'Ecosystem Vision',
  description:
    'Explore and visualize grants and ecosystem trends with actionable insights.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html
    lang="en"
    className={`overflow-x-hidden bg-[#070708] ${inter.variable} ${grotesk.variable}`}
  >
    <body className={inter.className}>
      <HeroUIProvider>
        <ReactQueryProvider>
          <NavLayout>{children}</NavLayout>
        </ReactQueryProvider>
      </HeroUIProvider>

      <PageScrollDisabler />
      <InitPathSyncer />
      <Toaster />

      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID ?? ''} />
    </body>
  </html>
);

export default RootLayout;
