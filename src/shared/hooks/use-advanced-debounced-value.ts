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
  const [pending, setPending] = useState({ value, delay, isPending: true });

  if (!Object.is(pending.value, value) || pending.delay !== delay) {
    setPending({ value, delay, isPending: true });
  }

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setPending((current) => ({ ...current, isPending: false }));
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setPending((current) => ({ ...current, isPending: false }));
      timeoutRef.current = null;
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current ?? undefined);
      timeoutRef.current = null;
    };
  }, [value, delay]);

  return { debouncedValue, isPending: pending.isPending, cancel };
};
