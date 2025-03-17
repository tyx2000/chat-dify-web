import { useEffect, useState, useRef, useCallback } from 'react';

export const useDebounceValue = (value: any, delay: number) => {
  const [delayValue, setDelayValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return delayValue;
};

export const useDebounceFn = (fn: Function, delay: number) => {
  const timeoutId = useRef<any>(null);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debounceFn = useCallback(
    (...args: any) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay],
  );

  const cancel = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    run: debounceFn,
    cancel,
  };
};
