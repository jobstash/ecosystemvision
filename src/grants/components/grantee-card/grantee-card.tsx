import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { getWebsiteText } from '@/shared/utils/get-website-text';
import { Divider } from '@/shared/components/divider';
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
    <div className="flex flex-col gap-4 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6 transition-all duration-300">
      <GranteeLogoTitle
        name={name}
        logo={logo}
        category={category}
        classNames={{
          root: 'h-16',
          logoWrapper: 'size-16',
        }}
      />

      <span>{summary}</span>

      {url && (
        <Button
          size="sm"
          as={Link}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 bg-white/10 text-sm"
        >
          <span>{getWebsiteText(url).hostname}</span>
          <ExternalIcon />
        </Button>
      )}

      <Divider />

      <div className="flex flex-col gap-2">
        <span>Funding Details</span>
        <GranteeFundingItems grantee={grantee} />
      </div>
    </div>
  );
};
