import { PrimitiveAtom, useAtom } from 'jotai';

import { cn } from '@/shared/utils/cn';

interface Props {
  id: string;
  idAtom: PrimitiveAtom<string | null>;
  children: React.ReactNode;
}

const CARD_WRAPPER_BASE_CLASS =
  'rounded-3xl bg-darkest-gray transition-all duration-300 hover:bg-darker-gray';
const CARD_WRAPPER_ACTIVE_CLASS =
  'bg-gradient-to-l from-primary to-secondary hover:brightness-125';

export const CardWrapper = (props: Props) => {
  const { id, idAtom, children } = props;
  const [activeId, setActiveId] = useAtom(idAtom);
  const isActive = activeId === id;
  const className = cn(CARD_WRAPPER_BASE_CLASS, {
    [CARD_WRAPPER_ACTIVE_CLASS]: isActive,
  });

  const onClick = () => {
    setActiveId(id);
  };

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};
