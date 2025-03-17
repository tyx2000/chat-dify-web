import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobie, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return !!isMobie;
};

export default useIsMobile;
