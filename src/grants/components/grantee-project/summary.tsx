interface Props {
  projectId: string;
}
export const Summary = ({ projectId }: Props) => {
  return <div className="p-12">{`Summary for "${projectId}"`}</div>;
};
