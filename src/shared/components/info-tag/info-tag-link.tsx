'use client';

import React from 'react';

import { Button } from '@nextui-org/button';

interface Props {
  className: string;
  href: string;
  content: React.ReactNode;
}

export const InfoTagLink = ({ className, href, content }: Props) => {
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank');
  };

  return (
    <Button className={className} onClick={onClick}>
      {content}
    </Button>
  );
};
