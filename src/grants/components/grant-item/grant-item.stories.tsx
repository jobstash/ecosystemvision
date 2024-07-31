import { Meta, StoryObj } from '@storybook/react';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantItem } from './grant-item';

const meta: Meta<typeof GrantItem> = {
  component: GrantItem,
  args: {
    grant: fakeGrant,
  },
};

export default meta;
type Story = StoryObj<typeof GrantItem>;

export const Default: Story = {};
