import { Meta, StoryObj } from '@storybook/react';

import { NavLayout } from '@/shared/components/nav-space-layout';

import HomePage from '@/app/page';

const meta: Meta<typeof HomePage> = {
  title: 'home/routes/index',
  component: HomePage,
  decorators: [
    (Story) => (
      <NavLayout>
        <Story />
      </NavLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
