import { Meta, StoryObj } from '@storybook/react';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantListItem } from './grant-list-item';

const meta: Meta<typeof GrantListItem> = {
  component: GrantListItem,
  args: {
    grant: fakeGrant,
  },
};

export default meta;
type Story = StoryObj<typeof GrantListItem>;

export const Default: Story = {};
