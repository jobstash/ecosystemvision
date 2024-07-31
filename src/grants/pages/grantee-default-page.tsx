interface Props {
  grantId: string;
}

/**
 * Display first grantee by default for the following routes:
 * - /grants/:grantId
 * - /grants/:grantId/grantees
 * */
export const GranteeDefaultPage = ({ grantId }: Props) => {
  // TODO: JOB-683
  return (
    <div className="flex flex-col">
      <span>{`Default Grantee Page for grant#${grantId}`}</span>
    </div>
  );
};
