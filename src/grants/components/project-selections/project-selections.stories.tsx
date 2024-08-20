import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { ProjectSelections } from '@/grants/components/project-selections';

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

const meta: Meta<typeof ProjectSelections> = {
  title: 'grants/components/project-selections',
  component: ProjectSelections,
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
type Story = StoryObj<typeof ProjectSelections>;

export const Default: Story = {};
