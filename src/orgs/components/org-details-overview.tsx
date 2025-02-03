import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsOverview = ({ org }: Props) => {
  return <pre>{JSON.stringify({ overview: org }, undefined, '\t')}</pre>;
};
