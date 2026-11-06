import { Meta, StoryObj } from '@storybook/react';

import { PrimaryButton } from './primary-button';

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
  args: {
    text: 'Default',
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {};
