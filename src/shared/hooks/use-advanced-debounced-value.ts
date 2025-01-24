import { useEffect, useRef, useState } from 'react';

type Result<T> = {
  debouncedValue: T;
  isPending: boolean;
  cancel: () => void;
};

export const useAdvancedDebouncedValue = <T>(
  value: T,
  delay: number,
): Result<T> => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState<boolean>(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsPending(false);
    }
  };

  useEffect(() => {
    setIsPending(true);
    cancel();

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
      timeoutRef.current = null;
    }, delay);

    return () => cancel();
  }, [value, delay]);

  return { debouncedValue, isPending, cancel };
};
