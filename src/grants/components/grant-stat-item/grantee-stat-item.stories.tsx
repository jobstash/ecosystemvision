import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { GranteeStatItem } from '@/grants/components/grant-stat-item/grantee-stat-item';

faker.seed(420);

const meta: Meta<typeof GranteeStatItem> = {
  title: 'grants/components/grantee-project/stat-item',
  component: GranteeStatItem,
};

export default meta;
type Story = StoryObj<typeof GranteeStatItem>;

export const Default: Story = {
  args: {
    granteeStat: {
      label: 'Contributors',
      value: '37',
      stats: [],
    },
  },
};

export const Nested: Story = {
  args: {
    granteeStat: {
      label: 'Contributors',
      value: '37',
      stats: [
        {
          label: 'Last 6 months',
          value: '2',
          stats: [],
        },
        {
          label: 'New Contributors',
          value: '1',
          stats: [],
        },
      ],
    },
  },
};

export const DeepNested: Story = {
  args: {
    granteeStat: {
      label: 'Contributors',
      value: '37',
      stats: [
        {
          label: 'New Contributors',
          value: '1',
          stats: [
            {
              label: 'Crypto Native',
              value: '4',
              stats: [],
            },

            {
              label: 'Open Source Contributor',
              value: '7',
              stats: [],
            },
          ],
        },
        {
          label: 'Last 6 months',
          value: '2',
          stats: [
            {
              label: 'First Half',
              value: '2',
              stats: [],
            },

            {
              label: 'Last Half',
              value: '4',
              stats: [],
            },
          ],
        },
      ],
    },
  },
};
