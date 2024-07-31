import { GrantButtonGroup } from './grant-button-group';

interface Props {
  grantId: string;
  granteeId: string;
}

export const ProjectSelection = ({ grantId, granteeId }: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects`;
  const projectButtons = [
    { text: 'Project 1', href: `${baseHref}/project-1` },
    { text: 'Project 2', href: `${baseHref}/project-2` },
  ];

  return <GrantButtonGroup buttons={projectButtons} />;
};
