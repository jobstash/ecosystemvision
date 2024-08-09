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
      className="flex items-center justify-between gap-4 rounded-[20px] bg-gradient-to-tr from-grantee-item/25 to-black p-6"
    >
      <div className="flex flex-col gap-4">
        <GranteeLogoTitle
          name={name}
          logo={logo}
          category={category}
          classNames={{
            root: '[&_*]:!text-13 [&_*]:!block'
          }}
        />
        <GranteeFundingItems grantee={grantee} />
      </div>
      <CaretRightIcon />
    </ClientWrapper>
  );
};
