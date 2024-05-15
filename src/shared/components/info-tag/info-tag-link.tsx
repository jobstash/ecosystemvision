'use client';

import { Button } from '@nextui-org/button';

interface Props {
  className: string;
  href: string;
  content: React.ReactNode;
}

export const InfoTagLink = ({ className, href, content }: Props) => {
  const onClick = () => {
    window.open(href, '_blank');
  };

  return (
    <Button className={className} onClick={onClick}>
      {content}
    </Button>
  );
};
