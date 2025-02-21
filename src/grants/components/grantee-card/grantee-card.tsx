'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';

import { getWebsiteText } from '@/shared/utils/get-website-text';
import { ExternalIcon } from '@/shared/components/icons/external-icon';
import { MarkdownContent } from '@/shared/components/markdown-content';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import {
  GranteeLogoTitle,
  GranteeLogoTitleSkeleton,
} from '@/grants/components/ui/grantee-logo-title';

const WRAPPER_CLASSNAME =
  'to-base-dark/20 flex flex-col gap-y-4 rounded-b-20 bg-gradient-to-t from-tertiary/20 p-6 transition-all duration-300 md:rounded-20 md:p-5 lg:bg-none lg:bg-white/10';

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
    return (
      <div className={WRAPPER_CLASSNAME}>
        <GranteeLogoTitleSkeleton />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-9/12 rounded-md" />
        </div>
        <Skeleton className="h-5 w-32 rounded-md" />
        <div className="flex flex-col gap-2 md:border-t md:border-divider/25 md:pt-4">
          <div className="flex gap-x-4">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return <p>{`TODO: <GranteeCardErrorUI /> "${errorMessage}"`}</p>;
  }

  if (!granteeData) {
    return <p>Grantee not found.</p>;
  }

  const { logoUrl, name, website, description } = granteeData;

  return (
    <div className={WRAPPER_CLASSNAME}>
      <GranteeLogoTitle name={name} logoUrl={logoUrl} />

      <MarkdownContent content={description} />

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
        <GranteeFundingItems granteeItem={granteeData} />
      </div>
    </div>
  );
};
