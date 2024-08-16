import { faker } from '@faker-js/faker';

import { GranteeProject } from '@/grants/core/schemas';

export const fakeGranteeProject = (
  partial: Partial<GranteeProject> = {},
): GranteeProject => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  tabs: [
    {
      label: 'Overall Summary',
      tab: 'summary',
      stats: [
        {
          label: 'Total Transactions',
          value: `${faker.number.float({ min: 1, max: 20, fractionDigits: 2 })}`,
          stats: [],
        },
        {
          label: 'Users Onboarded',
          value: `${faker.number.int({ min: 1000, max: 20_000_000 })}`,
          stats: [],
        },
        {
          label: 'Contributors',
          value: `${faker.number.int({ min: 5, max: 1000 })}`,
          stats: [
            {
              label: 'Last 6 months',
              value: `${faker.number.int({ min: 1, max: 50 })}`,
              stats: [],
            },
            {
              label: 'New Contributors',
              value: `${faker.number.int({ min: 0, max: 50 })}`,
              stats: [],
            },
          ],
        },
        {
          label: 'Github Stars',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: 'Last Commit Date',
          value: `${faker.date.past({ years: faker.number.int({ min: 1, max: 5 }) }).getDate()}`,
          stats: [],
        },
      ],
    },
    {
      label: 'Impact Metrics',
      tab: 'impact-metrics',
      stats: [
        {
          label: 'Gas Fees',
          value: `${faker.number.float({ min: 1, max: 20, fractionDigits: 2 })}`,
          stats: [],
        },
        {
          label: 'Total Transactions',
          value: `${faker.number.int({ min: 1000, max: 20_000_000 })}`,
          stats: [],
        },
        {
          label: 'Interactions from Trusted Optimism Users',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: "Trusted Optimism Users' Share of Total Interactions",
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: 'Users Onboarded',
          value: `${faker.number.int({ min: 1000, max: 20_000_000 })}`,
          stats: [],
        },
        {
          label: 'Interactions from Trusted Optimism Users',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: 'Average Trusted Daily Active Users (DAUs)',
          value: `${faker.number.int({ min: 1, max: 5000 })}`,
          stats: [],
        },
        {
          label: 'Average Monthly Active Addresses (MAAs)',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: 'Average Trusted Monthly Active Users (MAUs)',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
      ],
    },
    {
      label: 'Github Metrics',
      tab: 'github-metrics',
      stats: [
        {
          label: 'Stars',
          value: `${faker.number.int({ min: 1, max: 50_000 })}`,
          stats: [],
        },
        {
          label: 'First Commit Date',
          value: `${faker.date.past({ years: faker.number.int({ min: 1, max: 5 }) }).getDate()}`,
          stats: [],
        },
        {
          label: 'Last Commit Date',
          value: `${faker.date.recent({ days: faker.number.int({ min: 1, max: 90 }) }).getDate()}`,
          stats: [],
        },
        {
          label: 'Repos',
          value: `${faker.number.int({ min: 1, max: 100 })}`,
          stats: [],
        },
        {
          label: 'Forks',
          value: `${faker.number.int({ min: 1, max: 1000 })}`,
          stats: [],
        },
        {
          label: 'Contributors',
          value: `${faker.number.int({ min: 5, max: 1000 })}`,
          stats: [
            {
              label: 'Last 6 months',
              value: `${faker.number.int({ min: 1, max: 50 })}`,
              stats: [],
            },
            {
              label: 'New Contributors',
              value: `${faker.number.int({ min: 0, max: 50 })}`,
              stats: [],
            },
          ],
        },
        {
          label: 'Average Full Time Devs Last 6 months',
          value: `${faker.number.int({ min: 1, max: 100 })}`,
          stats: [],
        },
        {
          label: 'Average Active Devs Last 6 months',
          value: `${faker.number.int({ min: 1, max: 500 })}`,
          stats: [],
        },
      ],
    },
    {
      label: 'Code Metrics',
      tab: 'code-metrics',
      stats: [
        {
          label: 'First Commit Date',
          value: `${faker.date.past({ years: faker.number.int({ min: 1, max: 5 }) }).getDate()}`,
          stats: [],
        },
        {
          label: 'Last Commit Date',
          value: `${faker.date.recent({ days: faker.number.int({ min: 1, max: 90 }) }).getDate()}`,
          stats: [],
        },
        {
          label: 'Contributors',
          value: `${faker.number.int({ min: 5, max: 1000 })}`,
          stats: [
            {
              label: 'Last 6 months',
              value: `${faker.number.int({ min: 1, max: 50 })}`,
              stats: [],
            },
            {
              label: 'New Contributors',
              value: `${faker.number.int({ min: 0, max: 50 })}`,
              stats: [],
            },
          ],
        },
        {
          label: 'Average Full Time Devs Last 6 months',
          value: `${faker.number.int({ min: 1, max: 100 })}`,
          stats: [],
        },
        {
          label: 'Average Active Devs Last 6 months',
          value: `${faker.number.int({ min: 1, max: 500 })}`,
          stats: [],
        },
      ],
    },
    {
      label: 'Contract Address',
      tab: 'contract-address',
      stats: [
        {
          label: 'TODO',
          value: 'TODO',
          stats: [],
        },
      ],
    },
  ],
  tags: [],
  ...partial,
});

export const fakeGranteeProjects = ({
  min = 1,
  max = 2,
}: {
  min?: number;
  max?: number;
} = {}) => {
  const count = faker.number.int({ min, max });
  return Array.from({ length: count }, fakeGranteeProject);
};
