import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { MockQueryResult } from '@/shared/testutils/misc';

import { mockGranteeProjectQuery } from '@/grants/testutils/mock-grantee-project-query';

import { ProjectTabSelection } from './project-tab-selection';

faker.seed(420);

const meta: Meta<typeof ProjectTabSelection> = {
  title: 'grants/components/grantee-project/project-tab-selections',
  component: ProjectTabSelection,
  decorators: [
    (Story) => {
      const baseHref = '/grants/grant-1/grantees/grantee-1/projects';
      const defaultId = 'project-1';

      return (
        <div className="flex w-full justify-center">
          <Story args={{ baseHref, defaultId }} />
        </div>
      );
    },
  ],
  parameters: {
    nextjs: {
      navigation: {
        segments: [['projectId', 'project-1']],
      },
    },
    msw: {
      handlers: [mockGranteeProjectQuery(MockQueryResult.SUCCESS)],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectTabSelection>;

export const OverallSummary: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tab', 'summary']],
      },
    },
  },
};

export const ImpactMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tab', 'impact-metrics']],
      },
    },
  },
};

export const GithubMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tab', 'github-metrics']],
      },
    },
  },
};

export const CodeMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tab', 'code-metrics']],
      },
    },
  },
};

export const ContractAddress: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['tab', 'contract-address']],
      },
    },
  },
};
