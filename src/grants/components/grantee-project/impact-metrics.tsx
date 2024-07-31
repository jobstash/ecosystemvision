interface Props {
  projectId: string;
}
export const ImpactMetrics = ({ projectId }: Props) => {
  return <div className="p-12">{`Impact Metrics for "${projectId}"`}</div>;
};
