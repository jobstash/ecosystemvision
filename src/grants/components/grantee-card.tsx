interface Props {
  granteeId: string;
}

export const GranteeCard = ({ granteeId }: Props) => {
  // TODO: JOB-685

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6 py-16 transition-all duration-300">
      <span className="font-bold">{`Grantee ${granteeId}`}</span>
    </div>
  );
};
