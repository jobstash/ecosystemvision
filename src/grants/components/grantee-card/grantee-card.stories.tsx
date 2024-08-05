import { Meta, StoryObj } from '@storybook/react';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

import { GranteeCard } from './grantee-card';

const meta: Meta<typeof GranteeCard> = {
  title: 'grants/components/grantee-card',
  component: GranteeCard,
  args: {
    grantee: fakeGrantee,
  },
};

export default meta;
type Story = StoryObj<typeof GranteeCard>;

export const Default: Story = {};
