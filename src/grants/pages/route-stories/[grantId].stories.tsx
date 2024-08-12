import { Meta, StoryObj } from '@storybook/react';

import { NavLayout } from '@/shared/components/nav-space-layout';

import { MockInfiniteQueryResult } from '@/shared/testutils/misc';

import { GranteeList } from '@/grants/components/grantee-list';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import { fakeGrantee, fakeGrantees } from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';
import { GranteeDefaultPage } from '@/grants/pages/grantee-default-page';

const grantProgram = fakeGrant();
const grantee = fakeGrantee();
const grantees = [grantee, ...fakeGrantees().slice(1)];

const Component = () => {
  return (
    <NavLayout>
      <GrantPageLayout grant={grantProgram} list={<GranteeList />}>
        <GranteeDefaultPage grantId={grantProgram.id} />
      </GrantPageLayout>
    </NavLayout>
  );
};

const meta: Meta<typeof Component> = {
  title: 'grants/routes/[grantId]',
  component: Component,
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
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {};
