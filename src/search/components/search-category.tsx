'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { SearchResultDto } from '@/search/core/schemas';

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
          <span key={index} className="font-bold text-[#98eebe]">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </div>
  );
};

type Category = SearchResultDto['categories'][number];

interface Props extends Category {
  query: string;
}

export const SearchCategory = ({ label, url, query }: Props) => {
  return (
    <Button
      as={Link}
      href={url}
      size="sm"
      className=""
      endContent={<ExternalIcon />}
    >
      {highlightText(label, query)}
    </Button>
  );
};
