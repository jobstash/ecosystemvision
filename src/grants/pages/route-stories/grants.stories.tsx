import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { NavLayout } from '@/shared/components/nav-space-layout';

import { MockInfiniteQueryResult } from '@/shared/testutils/misc';

import { mockGrantListQuery } from '@/grants/testutils/mock-grant-list-query';

import { GrantListPage } from '@/grants/pages/grant-list-page';

const Component = () => (
  <NavLayout>
    <GrantListPage />
  </NavLayout>
);

const meta: Meta<typeof Component> = {
  title: 'grants/routes/grants',
  component: Component,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/grants',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [mockGrantListQuery(MockInfiniteQueryResult.SUCCESS)],
    },
  },
};

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
