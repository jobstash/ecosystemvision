import { Meta, StoryObj } from '@storybook/react';

import { MockInfiniteQueryResult } from '@/shared/testutils/misc';

import { mockGrantListQuery } from '@/grants/testutils/mock-grant-list-query';

import { GrantList } from './grant-list';

const meta: Meta<typeof GrantList> = {
  title: 'grants/components/grant-list',
  component: GrantList,
  args: {},
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.SUCCESS)],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GrantList>;

export const Success: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGrantListQuery(MockInfiniteQueryResult.SUCCESS, {
          networkDelay: 'infinite',
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.EMPTY)],
    },
  },
};

export const EndOfResults: Story = {
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.END_OF_RESULTS)],
    },
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.NETWORK_ERROR)],
    },
  },
};

export const FetchError: Story = {
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.FETCH_ERROR)],
    },
  },
};
