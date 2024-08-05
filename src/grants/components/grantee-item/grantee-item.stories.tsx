import { Meta, StoryObj } from '@storybook/react';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

import { GranteeItem } from './grantee-item';

const meta: Meta<typeof GranteeItem> = {
  title: 'grants/components/grantee-item',
  component: GranteeItem,
  args: {
    grantee: fakeGrantee,
  },
};

export default meta;
type Story = StoryObj<typeof GranteeItem>;

export const Default: Story = {};
