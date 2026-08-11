import test, { expect } from '@playwright/test';

import { ProjectDetails } from '@/projects/core/schemas';
import { ProjectDetailsHeader } from '@/projects/components/project-details-header';

const createProject = (
  summary: string | null,
  description: string | null,
) =>
  ({
    name: 'LayerBank',
    logo: null,
    website: null,
    summary,
    description,
    category: null,
    tvl: null,
    monthlyVolume: null,
    monthlyActiveUsers: null,
    monthlyFees: null,
    monthlyRevenue: null,
    github: null,
    twitter: null,
    telegram: null,
    docs: null,
    discord: null,
  }) as ProjectDetails;

test.describe('@desktop', () => {
  test('passes the project summary to the shared details header', () => {
    const header = ProjectDetailsHeader({
      project: createProject('The project summary', 'The full description'),
    });

    expect(header.props.summary).toBe('The project summary');
  });

  test('falls back to the project description when the summary is missing', () => {
    const header = ProjectDetailsHeader({
      project: createProject(null, 'The full description'),
    });

    expect(header.props.summary).toBe('The full description');
  });
});
