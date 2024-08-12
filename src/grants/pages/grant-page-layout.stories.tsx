import { Meta, StoryObj } from '@storybook/react';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { Grantee } from '@/grants/core/schemas';
import { GranteeList } from '@/grants/components/grantee-list';
import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import { fakeGrantee, fakeGrantees } from '@/grants/testutils/fake-grantee';
import { fakeGranteeProject } from '@/grants/testutils/fake-grantee-project';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeProjectQuery } from '@/grants/testutils/mock-grantee-project-query';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';
import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

const grantProgram = fakeGrant();
const grantee: Grantee = fakeGrantee();
const grantees = fakeGrantees({ firstId: grantee.id });
const project = fakeGranteeProject();

console.log({
  granteeId: grantee.id,
  granteesFirstId: grantees[0].id,
});

const meta: Meta<typeof GrantPageLayout> = {
  title: 'grants/pages/grant-program',
  component: GrantPageLayout,
  args: {
    grant: grantProgram,
    list: <GranteeList />,
  },
};

export default meta;
type Story = StoryObj<typeof GrantPageLayout>;

export const Default: Story = {
  args: {
    children: (
      <GranteePageLayout
        baseHref={`/grants/${grantProgram.id}/grantees/${grantee.id}/projects`}
        grantee={grantee}
      >
        <GranteeProjectStats stats={project.tabs[0].stats} />
      </GranteePageLayout>
    ),
  },
  parameters: {
    nextjs: {
      navigation: {
        segments: [
          ['grantId', grantProgram.id],
          ['granteeId', grantee.id],
          ['projectId', grantee.projects[0]],
          ['tab', project.tabs[0].tab],
        ],
      },
    },

    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          data: grantees,
        }),
        mockGranteeProjectQuery(MockQueryResult.SUCCESS),
      ],
    },
  },
};
