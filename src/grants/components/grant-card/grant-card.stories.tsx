import { Meta, StoryObj } from '@storybook/react';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantCard } from './grant-card';

const meta: Meta<typeof GrantCard> = {
  component: GrantCard,
  args: {
    grant: fakeGrant,
  },
};

export default meta;
type Story = StoryObj<typeof GrantCard>;

export const Default: Story = {};
