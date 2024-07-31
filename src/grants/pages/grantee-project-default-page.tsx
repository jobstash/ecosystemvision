interface Props {
  granteeId: string;
}

/**
 * Display first grantee-project by default for the following routes:
 * - /grants/:grantId/grantees/:granteeId
 * - /grants/:grantId/grantees/:granteeId/projects
 * */
export const GranteeProjectDefaultPage = ({ granteeId }: Props) => {
  // TODO: JOB-684
  return (
    <div className="flex flex-col">
      <span>{`Grantee Project Default Page for grantee#${granteeId}`}</span>
    </div>
  );
};
