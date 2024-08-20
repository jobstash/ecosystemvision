import { Meta, StoryObj } from '@storybook/react';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeCard } from '@/grants/components/grantee-card/grantee-card';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import {
  fakeGrantee,
  fakeGranteeItem,
  fakeGrantees,
} from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeQuery } from '@/grants/testutils/mock-grantee-query';

const grant = fakeGrant();
const grantId = grant.slug;
const grantee = fakeGrantee();
const grantees = [
  { ...fakeGranteeItem(), id: grantee.slug },
  ...fakeGrantees().slice(1),
];

const meta: Meta<typeof GranteeCard> = {
  title: 'grants/components/grantee-card',
  component: GranteeCard,
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
type Story = StoryObj<typeof GranteeCard>;

export const Default: Story = {};
