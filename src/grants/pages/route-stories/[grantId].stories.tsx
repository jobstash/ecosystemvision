import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { NavLayout } from '@/shared/components/nav-space-layout';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeList } from '@/grants/components/grantee-list';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import {
  fakeGrantee,
  fakeGranteeItem,
  fakeGrantees,
} from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeQuery } from '@/grants/testutils/mock-grantee-query';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';
import { GranteeDetailsSection } from '@/grants/pages/grantee-details-section';

faker.seed(69);

const grant = fakeGrant();
const grantee = fakeGrantee();
const grantees = [
  { ...fakeGranteeItem(), id: grantee.id },
  ...fakeGrantees().slice(1),
];

const Component = ({ content }: { content: React.ReactNode }) => {
  return <NavLayout>{content}</NavLayout>;
};

const meta: Meta<typeof Component> = {
  title: 'grants/routes/[grantId]',
  component: Component,
  args: {
    content: (
      <GrantPageLayout grant={grant} list={<GranteeList />}>
        <GranteeDetailsSection />
      </GrantPageLayout>
    ),
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grant.id}`,
        segments: [['grantId', grant.id]],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const OK: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
        }),
      ],
    },
  },
};

export const LoadingGrantees: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
          data: grantees,
          networkDelay: 'infinite',
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
        }),
      ],
    },
  },
};

export const LoadingGrantee: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
          networkDelay: 'infinite',
        }),
      ],
    },
  },
};

export const ErrorGrantees: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.NETWORK_ERROR, {
          grantId: grant.id,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
        }),
      ],
    },
  },
};

export const ErrorGrantee: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.FETCH_ERROR),
      ],
    },
  },
};

export const EmptyGrantees: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.EMPTY, {
          grantId: grant.id,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: grantee,
        }),
      ],
    },
  },
};

export const EmptyProject: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
        }),
        mockGranteeQuery(MockQueryResult.SUCCESS, {
          data: { ...grantee, projects: [] },
        }),
      ],
    },
  },
};

export const NotFoundGrantee: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGranteeListQuery(MockInfiniteQueryResult.SUCCESS, {
          grantId: grant.id,
          data: grantees,
        }),
        mockGranteeQuery(MockQueryResult.NOT_FOUND, {
          data: grantee,
        }),
      ],
    },
  },
};
