import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { getWebsiteText } from '@/shared/utils/get-website-text';
import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { Grantee } from '@/grants/core/schemas';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import { GranteeLogoTitle } from '@/grants/components/ui/grantee-logo-title';

interface Props {
  grantee: Grantee;
}

export const GranteeCard = ({ grantee }: Props) => {
  // TODO: JOB-685

  const { logo, name, url, category, summary } = grantee;

  return (
    <div className="to-base-dark/20 flex flex-col gap-y-4 rounded-b-lg bg-gradient-to-tr from-tertiary/20 p-6 transition-all duration-300 md:rounded-lg md:p-5">
      <GranteeLogoTitle
        name={name}
        logo={logo}
        category={category}
        classNames={{
        }}
      />

      <span className='text-13 text-white/75'>{summary}</span>

      {url && (
        <Button
          as={Link}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-auto w-fit items-center gap-1 rounded bg-white/10 p-1"
        >
          <span className='text-13 leading-4'>{getWebsiteText(url).hostname}</span>
          <ExternalIcon />
        </Button>
      )}

      <div className="flex flex-col gap-2 md:border-t md:border-divider/25 md:pt-4">
        <span className='text-13 text-white'>Funding Details</span>
        <GranteeFundingItems grantee={grantee} />
      </div>
    </div>
  );
};
