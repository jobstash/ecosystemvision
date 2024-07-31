interface Props {
  projectId: string;
}
export const CodeMetrics = ({ projectId }: Props) => {
  return <div className="p-12">{`Code Metrics for "${projectId}"`}</div>;
};
