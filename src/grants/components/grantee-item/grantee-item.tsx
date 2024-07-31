import { ClientWrapper } from './client-wrapper';

interface Props {
  id: string;
}

export const GranteeItem = ({ id }: Props) => {
  // TODO: JOB-680

  return <ClientWrapper granteeId={id}>{`Grantee #${id}`}</ClientWrapper>;
};
