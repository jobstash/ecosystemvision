import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { MockQueryResult } from '@/shared/testutils/misc';

import { ProjectSelections } from '@/grants/components/grantee-project/project-selections';

import { mockGranteeProjectQuery } from '@/grants/testutils/mock-grantee-project-query';

faker.seed(420);

const meta: Meta<typeof ProjectSelections> = {
  title: 'grants/components/grantee-project/project-selections',
  component: ProjectSelections,
  decorators: [
    (Story) => {
      const baseHref = '/grants/grant-1/grantees/grantee-1/projects';
      const projects = ['project-1', 'project-2'];

      return (
        <div className="flex w-full justify-center">
          <Story args={{ baseHref, projects }} />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectSelections>;

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeProjectQuery(MockQueryResult.SUCCESS, {
          networkDelay: 'infinite',
        }),
      ],
    },
  },
};

export const FirstProjectActive: Story = {
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

export const SecondProjectActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [['projectId', 'project-2']],
      },
    },
    msw: {
      handlers: [mockGranteeProjectQuery(MockQueryResult.SUCCESS)],
    },
  },
};
