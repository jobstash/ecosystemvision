import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeProjectStats } from '@/grants/components/project-stats/project-stats';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import {
  fakeGrantee,
  fakeGranteeItem,
  fakeGrantees,
} from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeQuery } from '@/grants/testutils/mock-grantee-query';

faker.seed(420);

const grant = fakeGrant();
const grantId = grant.slug;
const grantee = fakeGrantee();
const grantees = [
  { ...fakeGranteeItem(), id: grantee.id },
  ...fakeGrantees().slice(1),
];

const meta: Meta<typeof GranteeProjectStats> = {
  title: 'grants/components/project-stats',
  component: GranteeProjectStats,
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}`,
        segments: [['grantId', grantId]],
      },
    },
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId,
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          grantId,
          data: grantee,
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GranteeProjectStats>;

export const Default: Story = {};
