'use client';

import React from 'react';

import { Button } from '@heroui/button';

interface Props {
  className: string;
  href: string;
  content: React.ReactNode;
}

export const InfoTagLink = ({ className, href, content }: Props) => {
  const onPress = () => {
    window.open(href, '_blank');
  };

  return (
    <Button className={`${className} max-w-full`} onPress={onPress}>
      <div className="flex max-w-full items-center gap-x-2">{content}</div>
    </Button>
  );
};
