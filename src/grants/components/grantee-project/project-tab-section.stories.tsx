import { Meta, StoryObj } from '@storybook/react';

import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

import { fakeGranteeProject } from '@/grants/testutils/fake-grantee-project';

const fakeProject = fakeGranteeProject();

const meta: Meta<typeof GranteeProjectStats> = {
  title: 'grants/components/grantee-project/tab-section',
  component: GranteeProjectStats,
};

export default meta;
type Story = StoryObj<typeof GranteeProjectStats>;

export const OverallSummary: Story = {
  args: {
    stats: fakeProject.tabs[0].stats,
  },
};

export const ImpactMetrics: Story = {
  args: {
    stats: fakeProject.tabs[1].stats,
  },
};

export const GithubMetrics: Story = {
  args: {
    stats: fakeProject.tabs[2].stats,
  },
};

export const CodeMetrics: Story = {
  args: {
    stats: fakeProject.tabs[3].stats,
  },
};
