import { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { fakeGranteeItem } from '@/grants/testutils/fake-grantee';

import { GranteeListItem } from './item';

faker.seed(69);

const meta: Meta<typeof GranteeListItem> = {
  title: 'grants/components/grantee-list-item',
  component: GranteeListItem,
  args: {
    granteeItem: fakeGranteeItem(),
  },
};

export default meta;
type Story = StoryObj<typeof GranteeListItem>;

export const Default: Story = {};
