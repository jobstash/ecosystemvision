import { Grant } from '@/grants/core/schemas';
// import { getGrantCardData } from '@/grants/utils/get-grant-card-data';

interface Props {
  grant: Grant;
}

export const CollapsedGrantCard = ({ grant }: Props) => {
  // const {
  //   slug,
  //   logo,
  //   name,
  //   url,
  //   discord,
  //   twitter,
  //   topItems,
  //   hasTopItems,
  //   midItems,
  //   lowerItems,
  //   hasLowerItems,
  //   hasWebLinks,
  // } = getGrantCardData(grant);

  return (
    <div>
      <pre>{JSON.stringify(grant)}</pre>
    </div>
  );
};
