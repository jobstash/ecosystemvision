'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Markdown from 'react-markdown';

import { Button } from '@nextui-org/react';

import { getWebsiteText } from '@/shared/utils/get-website-text';
import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import { GranteeLogoTitle } from '@/grants/components/ui/grantee-logo-title';

export const GranteeCard = () => {
  const { grantId, granteeId } = useParams() as {
    grantId: string;
    granteeId?: string;
  };

  const { granteeData, isLoading, errorMessage } = useGranteeFetch(
    grantId,
    granteeId,
  );

  if (isLoading) {
    return <p>{'Loading <GranteeCard />...'}</p>;
  }

  if (errorMessage) {
    return <p>{`TODO: <GranteeCardErrorUI /> "${errorMessage}"`}</p>;
  }

  if (!granteeData?.data) {
    return <p>TODO: No Grantee UI</p>;
  }

  const { logoUrl, name, website, description } = granteeData.data;

  return (
    <div className="to-base-dark/20 rounded-b- flex flex-col gap-y-4 bg-gradient-to-tr from-tertiary/20 p-6 transition-all duration-300 md:rounded-lg md:p-5">
      <GranteeLogoTitle name={name} logoUrl={logoUrl} />

      <Markdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          a: ({ href, children }) => (
            <Link
              href={href ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold underline last:mb-0"
            >
              {children}
            </Link>
          ),
          h1: ({ children }) => (
            <h1 className="text-bold text-2xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-bold text-xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-bold text-lg font-bold">{children}</h3>
          ),
          ol: ({ children }) => (
            <ol className="list-outside list-decimal">{children}</ol>
          ),
          ul: ({ children }) => (
            <ul className="ml-2 list-inside list-disc space-y-1">{children}</ul>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
        }}
      >
        {description.replace(/\] \(/g, '](')}
      </Markdown>

      {website && (
        <Button
          as={Link}
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-fit items-center gap-1 rounded bg-white/10 p-1"
        >
          <span className="text-13 leading-4">
            {getWebsiteText(website).hostname}
          </span>
          <ExternalIcon />
        </Button>
      )}

      <div className="flex flex-col gap-2 md:border-t md:border-divider/25 md:pt-4">
        <span className="text-13 text-white">Funding Details</span>
        <GranteeFundingItems granteeItem={granteeData.data} />
      </div>
    </div>
  );
};
