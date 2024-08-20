import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { MockInfiniteQueryResult } from '@/shared/testutils/misc';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import {
  fakeGrantee,
  fakeGranteeItem,
  fakeGrantees,
} from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';

import { GranteeList } from './grantee-list';

faker.seed(69);

const grant = fakeGrant();
const grantId = grant.slug;
const grantee = fakeGrantee();
const grantees = [
  { ...fakeGranteeItem(), id: grantee.slug },
  ...fakeGrantees().slice(1),
];

const meta: Meta<typeof GranteeList> = {
  title: 'grants/components/grantee-list',
  component: GranteeList,
  args: {},
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId,
          data: grantees,
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GranteeList>;

export const Success: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId,
          data: grantees,
          networkDelay: 'infinite',
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.EMPTY, {
          grantId,
          data: grantees,
        }),
      ],
    },
  },
};

export const EndOfResults: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.END_OF_RESULTS, {
          grantId,
          data: grantees,
        }),
      ],
    },
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.NETWORK_ERROR, {
          grantId,
          data: grantees,
        }),
      ],
    },
  },
};

export const FetchError: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.FETCH_ERROR, {
          grantId,
          data: grantees,
        }),
      ],
    },
  },
};
