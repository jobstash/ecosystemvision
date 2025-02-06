'use client';

import {
  createContext,
  TransitionStartFunction,
  useContext,
  useTransition,
} from 'react';

interface TagsSectionCtx {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

const TagsSectionContext = createContext<TagsSectionCtx>({
  isLoading: false,
  startTransition: () => {},
});

export const useTagsSectionContext = () => {
  const ctx = useContext(TagsSectionContext);
  if (!ctx)
    throw new Error(
      'useTagsSectionContext must be used within a TagsSectionContext',
    );
  return ctx;
};

interface Props {
  children: React.ReactNode;
}

export const TagsSectionProvider = ({ children }: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <TagsSectionContext.Provider value={{ isLoading, startTransition }}>
      {children}
    </TagsSectionContext.Provider>
  );
};
