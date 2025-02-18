'use client';

import {
  createContext,
  TransitionStartFunction,
  useContext,
  useTransition,
} from 'react';

interface PendingRouteCtx {
  isPendingRoute: boolean;
  startTransition: TransitionStartFunction;
}

export const PendingRouteContext = createContext<PendingRouteCtx | null>(null);

export const usePendingRoute = () => {
  const context = useContext(PendingRouteContext);

  if (!context) {
    throw new Error(
      'usePendingRoute must be used within a PendingRouteContext',
    );
  }

  return context;
};

export const PendingRouteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPendingPillarRoute, startTransition] = useTransition();

  return (
    <PendingRouteContext.Provider
      value={{ isPendingRoute: isPendingPillarRoute, startTransition }}
    >
      {children}
    </PendingRouteContext.Provider>
  );
};
