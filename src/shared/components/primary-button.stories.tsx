import { Meta, StoryObj } from '@storybook/react';

import { PrimaryButton } from './primary-button';

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
  args: {
    text: 'Default',
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {};
