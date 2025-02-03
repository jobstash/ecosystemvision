import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsFunding = ({ org }: Props) => {
  const { fundingRounds, investors } = org;
  return (
    <pre>{JSON.stringify({ fundingRounds, investors }, undefined, '\t')}</pre>
  );
};
