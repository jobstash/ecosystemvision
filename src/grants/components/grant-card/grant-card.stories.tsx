import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantCard } from './grant-card';

faker.seed(420);

const meta: Meta<typeof GrantCard> = {
  title: 'grants/components/grant-card',
  component: GrantCard,
  args: {
    grant: fakeGrant(),
  },
  decorators: [
    (Story) => (
      <div className="h-[2100px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GrantCard>;

export const Default: Story = {};
