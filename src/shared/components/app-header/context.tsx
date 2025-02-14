'use client';

import { createContext, useContext, useReducer } from 'react';

interface AppHeaderCtx {
  showInput: boolean;
  toggleInput: () => void;
}

const AppHeaderContext = createContext<AppHeaderCtx>({
  showInput: false,
  toggleInput: () => {},
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
  hasBackButton?: boolean;
  initShowInput?: boolean;
}

export const AppHeaderProvider = ({
  children,
  hasBackButton,
  initShowInput,
}: Props) => {
  const [showInput, toggleInput] = useReducer(
    (prev: boolean) => !prev,
    !!initShowInput,
  );

  const value = {
    showInput: !hasBackButton || showInput,
    toggleInput,
  };

  return (
    <AppHeaderContext.Provider value={value}>
      {children}
    </AppHeaderContext.Provider>
  );
};
