import { Meta, StoryObj } from '@storybook/react';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeCard } from '@/grants/components/grantee-card/grantee-card';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import { fakeGrantee, fakeGrantees } from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeQuery } from '@/grants/testutils/mock-grantee-query';

const grant = fakeGrant();
const grantee = fakeGrantee();
const grantees = [grantee, ...fakeGrantees().slice(1)];

const meta: Meta<typeof GranteeCard> = {
  title: 'grants/components/grantee-card',
  component: GranteeCard,
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grant.id}`,
        segments: [['grantId', grant.id]],
      },
    },
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GranteeCard>;

export const Default: Story = {};
