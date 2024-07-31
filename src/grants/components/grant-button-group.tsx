import Link from 'next/link';

import { Button, ButtonGroup } from '@nextui-org/react';

interface Props {
  buttons: { text: string; href: string }[];
}

export const GrantButtonGroup = ({ buttons }: Props) => {
  return (
    <ButtonGroup variant="faded">
      {buttons.map(({ text, href }) => (
        <Button key={href} as={Link} href={href} className="grow bg-white/10">
          {text}
        </Button>
      ))}
    </ButtonGroup>
  );
};
