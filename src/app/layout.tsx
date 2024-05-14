import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { lato, roboto } from '@/shared/core/fonts';
import { Nav } from '@/shared/components/nav';
import { NextUIProvider } from '@/shared/providers/next-ui-provider';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Projects.fyi',
  description: 'Projects.fyi',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en" className={`${lato.variable} ${roboto.variable}`}>
    <body className={inter.className}>
      <NextUIProvider>
        <ReactQueryProvider>
          <Nav />
          {children}
        </ReactQueryProvider>
      </NextUIProvider>
    </body>
  </html>
);

export default RootLayout;
