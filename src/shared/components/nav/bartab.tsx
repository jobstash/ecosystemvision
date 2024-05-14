'use client';

import { usePathname } from 'next/navigation';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import { cn } from '@/shared/utils/cn';

import { useCloseNav } from './use-close-nav';

interface BartabProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isMobile?: boolean;
}

export const Bartab = (props: BartabProps) => {
  const { icon, text, href, isMobile = false } = props;

  const pathname = usePathname();
  const isActive = href === pathname.slice(0, href.length);

  const { closeNav } = useCloseNav();

  const handleClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    closeNav();
  };

  const buttonClassName = cn('justify-start bg-none', {
    'bg-gradient-to-l from-[#8743FF] to-[#4136F1]': isActive || isMobile,
  });

  return (
    <Button
      fullWidth
      as={Link}
      href={href}
      radius="sm"
      startContent={icon}
      className={buttonClassName}
      onClick={handleClick}
      data-active={isActive}
    >
      <span className="text-2xl text-white md:text-sm md:font-semibold">
        {text}
      </span>
    </Button>
  );
};
