interface Props {
  projectId: string;
}
export const Contact = ({ projectId }: Props) => {
  return <div className="p-12">{`Contact for "${projectId}"`}</div>;
};
