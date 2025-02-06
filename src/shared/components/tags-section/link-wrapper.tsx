'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTagsSectionContext } from './context';

interface Props {
  nav: string;
  slug: string;
  children: React.ReactNode;
}

export const LinkWrapper = ({ nav, slug, children }: Props) => {
  const href = `/${nav}/tags/${slug}`;

  const { startTransition } = useTagsSectionContext();

  const router = useRouter();
  const onClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
};
