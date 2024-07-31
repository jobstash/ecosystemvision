import { GranteeItem } from './grantee-item/grantee-item';

interface Props {
  grantId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GranteeList = ({ grantId }: Props) => {
  // TODO: JOB-681
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 64 }).map((_, index) => (
        <GranteeItem key={index} id={`${index + 1}`} />
      ))}
    </div>
  );
};
export default GranteeList;