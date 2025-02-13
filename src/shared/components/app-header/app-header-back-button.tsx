'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@heroui/button';
import { ChevronLeftIcon } from 'lucide-react';

import { capitalize } from '@/shared/utils/capitalize';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  nav: string;
}

export const AppHeaderBackButton = ({ nav }: Props) => {
  const { startTransition } = usePillarRoutesContext();
  const router = useRouter();

  const navigate = () => {
    startTransition(() => {
      router.push(`/${nav}`);
    });
  };

  const onBack = () => {
    const shouldNavigate =
      typeof window !== 'undefined' && window.history.length < 3;

    shouldNavigate ? navigate() : router.back();
  };

  return (
    <div className="flex items-center gap-4">
      <Button isIconOnly onClick={onBack}>
        <ChevronLeftIcon size={20} />
      </Button>
      <span>Back to {capitalize(nav)}</span>
    </div>
  );
};
