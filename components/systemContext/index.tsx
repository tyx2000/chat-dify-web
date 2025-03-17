'use client';

import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
}

// @ts-ignore
export const SystemContext = createContext<ContextProps>({});

export default function SystemProvider({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <SystemContext
      value={{
        openSidebar,
        toggleSidebar: () => setOpenSidebar((c) => !c),
      }}
    >
      {children}
    </SystemContext>
  );
}
