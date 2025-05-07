'use client';

import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  sidePanel: boolean;
  toggleSidePanel: () => void;
}

// @ts-ignore
export const SystemContext = createContext<ContextProps>({});

export default function SystemProvider({ children }: { children: ReactNode }) {
  const [sidePanel, setOpenSidebar] = useState(false);
  return (
    <SystemContext
      value={{
        sidePanel,
        toggleSidePanel: () => setOpenSidebar((c) => !c),
      }}
    >
      {children}
    </SystemContext>
  );
}
