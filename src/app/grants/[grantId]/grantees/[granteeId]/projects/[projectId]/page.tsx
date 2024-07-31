import { Summary } from '@/grants/components/grantee-project/summary';

interface Props {
  params: { grantId: string; granteeId: string; projectId: string };
}

const ProjectIdPage = ({ params: { projectId } }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Summary projectId={projectId} />
    </div>
  );
};
export default ProjectIdPage;
