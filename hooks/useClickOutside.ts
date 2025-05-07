import { RefObject, useEffect, useRef } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => {
      // @ts-ignore
      if (!ref.current!.contains(e.target as Node)) {
        callbackRef.current();
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [ref]);
};

export default useClickOutside;
