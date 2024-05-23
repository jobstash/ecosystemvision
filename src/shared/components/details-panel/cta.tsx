'use client';

import Link from 'next/link';

import { PrimaryButton } from '@/shared/components/primary-button';

interface Props {
  text: string;
  href: string;
  isNewTab?: boolean;
}

export const DetailsPanelCTA = ({ text, href, isNewTab }: Props) => {
  return (
    <PrimaryButton
      as={Link}
      text={text}
      href={href}
      target={isNewTab ? '_blank' : undefined}
      rel={isNewTab ? 'noopener noreferrer' : undefined}
    />
  );
};
