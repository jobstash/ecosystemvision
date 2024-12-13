'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { TSearchResultItem } from '@/search/core/schemas';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <div className="">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="font-semibold text-accent2">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </div>
  );
};

interface Props extends TSearchResultItem {
  query: string;
}

export const SearchResultItem = ({ label, href, query }: Props) => {
  const router = useRouter();
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();
  const onClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };
  return (
    <Button
      as={Link}
      href={href}
      size="sm"
      className=""
      isDisabled={isPendingPillarRoute}
      endContent={<ExternalIcon />}
      onClick={onClick}
    >
      <span className="text-13">{highlightText(label, query)}</span>
    </Button>
  );
};
