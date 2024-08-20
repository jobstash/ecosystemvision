import { Inter_Tight, Space_Grotesk } from 'next/font/google';

export const interTight = Inter_Tight({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

export const grotesk = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});
