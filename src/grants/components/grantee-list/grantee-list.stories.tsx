import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { MockInfiniteQueryResult } from '@/shared/testutils/misc';

import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';

import { GranteeList } from './grantee-list';

faker.seed(69);

const meta: Meta<typeof GranteeList> = {
  title: 'grants/components/grantee-list',
  component: GranteeList,
  args: {},
  parameters: {
    msw: {
      handlers: [mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS)],
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
          networkDelay: 'infinite',
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [mockGranteeListQuery(MockInfiniteQueryResult.EMPTY)],
    },
  },
};

export const EndOfResults: Story = {
  parameters: {
    msw: {
      handlers: [mockGranteeListQuery(MockInfiniteQueryResult.END_OF_RESULTS)],
    },
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [mockGranteeListQuery(MockInfiniteQueryResult.NETWORK_ERROR)],
    },
  },
};

export const FetchError: Story = {
  parameters: {
    msw: {
      handlers: [mockGranteeListQuery(MockInfiniteQueryResult.FETCH_ERROR)],
    },
  },
};
