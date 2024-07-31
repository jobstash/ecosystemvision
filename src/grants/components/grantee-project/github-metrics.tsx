interface Props {
  projectId: string;
}
export const GithubMetrics = ({ projectId }: Props) => {
  return <div className="p-12">{`Github Metrics for "${projectId}"`}</div>;
};
