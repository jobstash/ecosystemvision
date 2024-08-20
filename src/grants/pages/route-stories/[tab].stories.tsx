import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { NavLayout } from '@/shared/components/nav-space-layout';

import {
  MockInfiniteQueryResult,
  MockQueryResult,
} from '@/shared/testutils/misc';

import { GranteeList } from '@/grants/components/grantee-list';

import { fakeGrant } from '@/grants/testutils/fake-grant';
import { fakeGrantee, fakeGrantees } from '@/grants/testutils/fake-grantee';
import { mockGranteeListQuery } from '@/grants/testutils/mock-grantee-list-query';
import { mockGranteeQuery } from '@/grants/testutils/mock-grantee-query';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';
import { GranteeDetailsSection } from '@/grants/pages/grantee-details-section';

faker.seed(69);

const grant = fakeGrant();
const grantId = grant.slug;
const grantee = fakeGrantee();
const granteeId = grantee.id;
const grantees = [grantee, ...fakeGrantees().slice(1)];
const projectId = grantee.projects[0].id;

const Component = ({ content }: { content: React.ReactNode }) => {
  return <NavLayout>{content}</NavLayout>;
};

const meta: Meta<typeof Component> = {
  title: 'grants/routes/[tab]',
  component: Component,
  args: {
    content: (
      <GrantPageLayout grant={grant} list={<GranteeList />}>
        <GranteeDetailsSection />
      </GrantPageLayout>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}/grantees/${granteeId}/projects/summary`,
        segments: [
          ['grantId', grantId],
          ['granteeId', granteeId],
          ['projectId', projectId],
          ['tab', 'summary'],
        ],
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

export const ImpactMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}/grantees/${granteeId}/projects/impact-metrics`,
        segments: [
          ['grantId', grantId],
          ['granteeId', granteeId],
          ['projectId', projectId],
          ['tab', 'impact-metrics'],
        ],
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

export const GithubMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}/grantees/${granteeId}/projects/github-metrics`,
        segments: [
          ['grantId', grantId],
          ['granteeId', granteeId],
          ['projectId', projectId],
          ['tab', 'github-metrics'],
        ],
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

export const CodeMetrics: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}/grantees/${granteeId}/projects/code-metrics`,
        segments: [
          ['grantId', grantId],
          ['granteeId', granteeId],
          ['projectId', projectId],
          ['tab', 'code-metrics'],
        ],
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

export const ContractAddress: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: `/grants/${grantId}/grantees/${granteeId}/projects/contract-address`,
        segments: [
          ['grantId', grantId],
          ['granteeId', granteeId],
          ['projectId', projectId],
          ['tab', 'contract-address'],
        ],
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
