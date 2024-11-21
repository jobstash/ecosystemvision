'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { TSearchResultItem } from '@/search/core/schemas';

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
          <span key={index} className="text-[#98eebe]">
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
  return (
    <Button
      as={Link}
      href={href}
      size="sm"
      className=""
      endContent={<ExternalIcon />}
    >
      <span className="text-13">{highlightText(label, query)}</span>
    </Button>
  );
};
