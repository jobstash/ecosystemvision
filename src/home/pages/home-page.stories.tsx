import { Meta, StoryObj } from '@storybook/react';

import HomePage from '@/app/page';

const meta: Meta<typeof HomePage> = {
  title: 'pages/home',
  component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
