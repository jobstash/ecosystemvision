'use client';

import { Button, ButtonProps } from '@heroui/react';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props extends ButtonProps {
  href: string;
}

export const ExternalLinkButton = ({ href, children, ...props }: Props) => {
  return (
    <Button {...props} onPress={() => openNewTab(href)}>
      {children}
    </Button>
  );
};
