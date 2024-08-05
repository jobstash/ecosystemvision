import { Grantee } from '@/grants/core/schemas';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import { GranteeLogoTitle } from '@/grants/components/ui/grantee-logo-title';
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

import { ClientWrapper } from './client-wrapper';

interface Props {
  grantee: Grantee;
}

export const GranteeListItem = ({ grantee }: Props) => {
  // TODO: JOB-680

  const { id, name, logo, category } = grantee;

  return (
    <ClientWrapper
      granteeId={id}
      className="flex items-center justify-between gap-4 rounded-lg p-4"
    >
      <div className="flex flex-col gap-4">
        <GranteeLogoTitle name={name} logo={logo} category={category} />
        <GranteeFundingItems grantee={grantee} />
      </div>
      <CaretRightIcon />
    </ClientWrapper>
  );
};
