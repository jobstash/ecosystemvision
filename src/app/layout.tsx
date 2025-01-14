import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';

import { GOOGLE_ANALYTICS_ID } from '@/shared/core/envs';
import { grotesk, interTight } from '@/shared/core/fonts';
import { InitPathSyncer } from '@/shared/components/init-path-syncer';
import { NavLayout } from '@/shared/components/nav-space-layout';
import { PageScrollDisabler } from '@/shared/components/page-scroll-disabler';
import { NextUIProvider } from '@/shared/providers/next-ui-provider';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';

import { Toaster } from '@/grants/components/toaster';

const inter = Inter({ subsets: ['latin'] });

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
    className={`overflow-x-hidden bg-[#070708] ${interTight.variable} ${grotesk.variable}`}
  >
    <body className={inter.className}>
      <NextUIProvider>
        <ReactQueryProvider>
          <NavLayout>{children}</NavLayout>
        </ReactQueryProvider>
      </NextUIProvider>

      <PageScrollDisabler />
      <InitPathSyncer />
      <Toaster />

      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID ?? ''} />
    </body>
  </html>
);

export default RootLayout;
