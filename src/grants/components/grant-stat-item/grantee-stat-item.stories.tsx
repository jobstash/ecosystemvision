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

export const TrimmedDecimal: Story = {
  args: {
    granteeStat: {
      label: 'Some Label',
      value: 'Sample non-integer value',
      stats: [
        {
          label: 'New Contributors',
          value: '35.023523',
          stats: [
            {
              label: 'Crypto Native',
              value: '4.457',
              stats: [],
            },

            {
              label: 'Open Source Contributor',
              value: '7.55',
              stats: [],
            },
          ],
        },
        {
          label: 'Last 6 months',
          value: '2.342634263246326',
          stats: [
            {
              label: 'First Half',
              value: '2.123421351236236',
              stats: [],
            },

            {
              label: 'Last Half',
              value: '4.324632463246',
              stats: [],
            },
          ],
        },
      ],
    },
  },
};
