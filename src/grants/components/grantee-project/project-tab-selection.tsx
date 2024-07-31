import { GrantButtonGroup } from '../grant-button-group';

interface Props {
  grantId: string;
  granteeId: string;
  projectId: string;
}

const ProjectTabSelection = ({ grantId, granteeId, projectId }: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects/${projectId}`;
  const tabButtons = [
    { text: 'Overall Summary', href: `${baseHref}/summary` },
    { text: 'Impact Metrics', href: `${baseHref}/impact-metrics` },
    { text: 'Github Metrics', href: `${baseHref}/github-metrics` },
    { text: 'Code Metrics', href: `${baseHref}/code-metrics` },
    { text: 'Contact Address', href: `${baseHref}/contact` },
  ];

  return (
    <div className="flex flex-col gap-2">
      <GrantButtonGroup buttons={tabButtons} />
    </div>
  );
};

export default ProjectTabSelection;
