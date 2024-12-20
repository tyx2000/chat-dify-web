'use client';

import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  openSidebar: boolean;
  toggleSidebar: (c: boolean) => void;
}

// @ts-ignore
export const SystemContext = createContext<ContextProps>({});

export default function SystemProvider({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <SystemContext
      value={{
        openSidebar,
        toggleSidebar: (c) => setOpenSidebar(c),
      }}
    >
      {children}
    </SystemContext>
  );
}
