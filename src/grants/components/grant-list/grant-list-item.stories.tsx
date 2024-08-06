import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { fakeGrant } from '@/grants/testutils/fake-grant';

import { GrantListItem } from './grant-list-item';

faker.seed(420);

const meta: Meta<typeof GrantListItem> = {
  title: 'grants/components/grant-list-item',
  component: GrantListItem,
  args: {
    grant: fakeGrant(),
  },
};

export default meta;
type Story = StoryObj<typeof GrantListItem>;

export const Default: Story = {};
