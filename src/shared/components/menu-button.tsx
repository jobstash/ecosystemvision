'use client';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { showFullscreenNavAtom } from '@/shared/core/atoms';

interface Props {
  testId?: string;
}

export const MenuButton = ({ testId }: Props) => {
  const setShowNav = useSetAtom(showFullscreenNavAtom);

  const openNav = () => {
    setShowNav(true);
  };

  return (
    <Button
      isIconOnly
      className="bg-transparent lg:hidden"
      onClick={openNav}
      data-testid={testId}
    >
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 21.4062H27C27.5523 21.4062 28 20.9585 28 20.4062C28 19.854 27.5523 19.4062 27 19.4062H5C4.44772 19.4062 4 19.854 4 20.4062C4 20.9585 4.44772 21.4062 5 21.4062Z"
          fill="#F9FAFB"
        />
        <path
          d="M5 13.4062H27C27.5523 13.4062 28 12.9585 28 12.4062C28 11.854 27.5523 11.4062 27 11.4062H5C4.44772 11.4062 4 11.854 4 12.4062C4 12.9585 4.44772 13.4062 5 13.4062Z"
          fill="#F9FAFB"
        />
      </svg>
    </Button>
  );
};
