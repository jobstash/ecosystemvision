'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

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

  const { logo, name, url, category, summary } = granteeData.data;

  return (
    <div className="to-base-dark/20 flex flex-col gap-y-4 rounded-b-lg bg-gradient-to-tr from-tertiary/20 p-6 transition-all duration-300 md:rounded-lg md:p-5">
      <GranteeLogoTitle name={name} logo={logo} category={category} />

      <span className="text-13 text-white/75">{summary}</span>

      {url && (
        <Button
          as={Link}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-fit items-center gap-1 rounded bg-white/10 p-1"
        >
          <span className="text-13 leading-4">
            {getWebsiteText(url).hostname}
          </span>
          <ExternalIcon />
        </Button>
      )}

      <div className="flex flex-col gap-2 md:border-t md:border-divider/25 md:pt-4">
        <span className="text-13 text-white">Funding Details</span>
        <GranteeFundingItems grantee={granteeData.data} />
      </div>
    </div>
  );
};
