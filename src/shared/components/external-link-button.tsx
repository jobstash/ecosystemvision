'use client';

import { Button, ButtonProps } from '@nextui-org/button';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props extends ButtonProps {
  href: string;
}

export const ExternalLinkButton = ({ href, children, ...props }: Props) => {
  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    openNewTab(href);
  };

  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};
