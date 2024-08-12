import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { lato, roboto } from '@/shared/core/fonts';
import { InitPathSyncer } from '@/shared/components/init-path-syncer';
import { NavLayout } from '@/shared/components/nav-space-layout';
import { PageScrollDisabler } from '@/shared/components/page-scroll-disabler';
import { NextUIProvider } from '@/shared/providers/next-ui-provider';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';

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
    className={`bg-[#0D0D0D] ${lato.variable} ${roboto.variable}`}
  >
    <body className={inter.className}>
      <NextUIProvider>
        <ReactQueryProvider>
          <NavLayout>{children}</NavLayout>
        </ReactQueryProvider>
      </NextUIProvider>

      <PageScrollDisabler />
      <InitPathSyncer />
    </body>
  </html>
);

export default RootLayout;
