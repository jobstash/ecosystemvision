'use client';

import {
  createContext,
  TransitionStartFunction,
  useContext,
  useTransition,
} from 'react';

interface PillarRoutesCtx {
  isPendingPillarRoute: boolean;
  startTransition: TransitionStartFunction;
}

export const PillarRoutesContext = createContext<PillarRoutesCtx | null>(null);

export const usePillarRoutesContext = () => {
  const context = useContext(PillarRoutesContext);

  if (!context) {
    throw new Error(
      'usePillarRoutesContext must be used within a PillarRoutesContext',
    );
  }

  return context;
};

export const PillarRoutesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPendingPillarRoute, startTransition] = useTransition();

  return (
    <PillarRoutesContext.Provider
      value={{ isPendingPillarRoute, startTransition }}
    >
      {children}
    </PillarRoutesContext.Provider>
  );
};
