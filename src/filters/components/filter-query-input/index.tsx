'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';

import { SearchInputIcon } from '@/shared/components/icons/seach-input-icon';

import { useFilterQueryInput } from './use-filter-query-input';

interface Props {
  placeholder: string;
}

export const FilterQueryInput = ({ placeholder }: Props) => {
  const { onSubmit, isPending, applyQuery, value, setValue } =
    useFilterQueryInput();

  const startContent = isPending ? (
    <Spinner size="sm" color="white" />
  ) : (
    <SearchInputIcon />
  );

  const endContent = (
    <Button aria-label="Search" className="bg-transparent" onClick={applyQuery}>
      Search
    </Button>
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <Input
        disabled={isPending}
        placeholder={placeholder}
        className="bg-darkest-gray dark:hover:bg-darker-gray"
        startContent={startContent}
        endContent={endContent}
        value={value}
        onChange={onChange}
      />
    </form>
  );
};
