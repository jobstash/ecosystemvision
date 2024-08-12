import { Grantee } from '@/grants/core/schemas';
import { GranteeFundingItems } from '@/grants/components/ui/grantee-funding-items';
import { GranteeLogoTitle } from '@/grants/components/ui/grantee-logo-title';
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

interface Props {
  grantee: Grantee;
}

export const GranteeListItem = ({ grantee }: Props) => {
  // TODO: JOB-680

  const { name, logo, category } = grantee;

  return (
    <>
      <div className="flex flex-col gap-4">
        <GranteeLogoTitle
          name={name}
          logo={logo}
          category={category}
          classNames={{
            root: '[&_*]:!text-13 [&_*]:!block',
          }}
        />
        <GranteeFundingItems grantee={grantee} />
      </div>
      <CaretRightIcon />
    </>
  );
};
