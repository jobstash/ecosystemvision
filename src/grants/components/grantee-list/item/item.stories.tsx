import { Meta, StoryObj } from '@storybook/react';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

import { GranteeListItem } from './item';

const meta: Meta<typeof GranteeListItem> = {
  title: 'grants/components/grantee-list-item',
  component: GranteeListItem,
  args: {
    grantee: fakeGrantee,
  },
};

export default meta;
type Story = StoryObj<typeof GranteeListItem>;

export const Default: Story = {};
