interface Props {
  id: string;
}

export const GrantCard = ({ id }: Props) => {
  // TODO: JOB-678
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6 py-16 transition-all duration-300 hover:bg-white/10">
      <span className="font-bold">{`Grant Program ${id}`}</span>
    </div>
  );
};
