'use client';

import { useAppHeaderContext } from './context';
import { SearchDetailsInput } from './search-details-input';

interface Props {
  mainInput: React.ReactNode;
}

export const MainInput = ({ mainInput }: Props) => {
  const { isDetailsSearch } = useAppHeaderContext();

  if (!isDetailsSearch) return mainInput;

  return <SearchDetailsInput />;
};
