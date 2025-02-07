'use client';

import { createContext, useContext, useReducer } from 'react';

interface AppHeaderCtx {
  isDetailsSearch: boolean;
  toggleDetailsSearch: () => void;
}

const AppHeaderContext = createContext<AppHeaderCtx>({
  isDetailsSearch: false,
  toggleDetailsSearch: () => {},
});

export const useAppHeaderContext = () => {
  const context = useContext(AppHeaderContext);
  if (!context) {
    throw new Error(
      'useAppHeaderContext must be used within a AppHeaderProvider',
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const AppHeaderProvider = ({ children }: Props) => {
  const [isDetailsSearch, toggleDetailsSearch] = useReducer(
    (prev: boolean) => !prev,
    false,
  );

  const value = {
    isDetailsSearch,
    toggleDetailsSearch,
  };

  return (
    <AppHeaderContext.Provider value={value}>
      {children}
    </AppHeaderContext.Provider>
  );
};
