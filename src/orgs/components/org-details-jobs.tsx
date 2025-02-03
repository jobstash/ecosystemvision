import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsJobs = ({ org }: Props) => {
  const { jobs } = org;
  return <pre>{JSON.stringify(jobs, undefined, '\t')}</pre>;
};
