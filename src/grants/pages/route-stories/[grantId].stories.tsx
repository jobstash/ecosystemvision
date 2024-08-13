import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { NavLayout } from '@/shared/components/nav-space-layout';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeList } from '@/grants/components/grantee-list';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import { fakeGrantee, fakeGrantees } from '@/grants/testutils/fake-grantee';
import { fakeGranteeProject } from '@/grants/testutils/fake-grantee-project';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeProjectQuery } from '@/grants/testutils/mock-grantee-project-query';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';
import { GranteeDefaultSection } from '@/grants/pages/grantee-default-section';

faker.seed(69);

const grantProgram = fakeGrant();
const grantee = fakeGrantee();
const grantees = [grantee, ...fakeGrantees().slice(1)];
const granteeProject = fakeGranteeProject({ id: grantee.projects[0] });

const Component = ({ content }: { content: React.ReactNode }) => {
  return <NavLayout>{content}</NavLayout>;
};

const meta: Meta<typeof Component> = {
  title: 'grants/routes/[grantId]',
  component: Component,
  args: {
    content: (
      <GrantPageLayout grant={grantProgram} list={<GranteeList />}>
        <GranteeDefaultSection
          grantId={grantProgram.id}
          grantee={grantee}
          stats={granteeProject.tabs[0].stats}
        />
      </GrantPageLayout>
    ),
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantProgram.id}`,
        segments: [['grantId', grantProgram.id]],
      },
    },
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          data: grantees,
        }),
        mockGranteeProjectQuery(MockQueryResult.SUCCESS, {
          data: granteeProject,
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Success: Story = {};
