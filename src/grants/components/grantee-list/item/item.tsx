import { GranteeItem } from '@/grants/core/schemas';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import { GranteeLogoTitle } from '@/grants/components/ui/grantee-logo-title';
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

interface Props {
  granteeItem: GranteeItem;
}

export const GranteeListItem = ({ granteeItem }: Props) => {
  // TODO: JOB-680

  return (
    <>
      <div className="flex flex-col gap-4">
        <GranteeLogoTitle
          name={granteeItem.name}
          logo={granteeItem.logoUrl}
          // TODO: Confirm with team if grantee has category
          category={''}
          classNames={{
            root: '[&_*]:!text-13 [&_*]:!block',
          }}
        />
        <GranteeFundingItems granteeItem={granteeItem} />
      </div>
      <CaretRightIcon />
    </>
  );
};
