'use client';

import { useRouter } from 'next/navigation';

import { Button } from "@heroui/button";

interface Props {
  fallbackUrl?: string;
}

export const GrantBackButton = ({ fallbackUrl = '/' }: Props) => {
  const { push } = useRouter();

  const onClick = () => {
    push(fallbackUrl, { scroll: true });
  };

  // TODO: JOB-676

  return (
    <Button className="w-fit" onClick={onClick}>
      Back to Grant Programs
    </Button>
  );
};
