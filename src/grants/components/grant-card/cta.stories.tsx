import { Meta, StoryObj } from '@storybook/react';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantCardCTA } from './cta';

const meta: Meta<typeof GrantCardCTA> = {
  component: GrantCardCTA,
  args: {
    ...fakeGrant,
  },
};

export default meta;
type Story = StoryObj<typeof GrantCardCTA>;

export const Default: Story = {};
