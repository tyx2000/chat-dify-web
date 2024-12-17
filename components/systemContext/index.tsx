'use client';

import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  token: string | undefined;
  openSidebar: boolean;
  toggleSidebar: (c: boolean) => void;
}

// @ts-ignore
export const SystemContext = createContext<ContextProps>({});

export default function SystemProvider({
  children,
  token,
}: {
  children: ReactNode;
  token?: string;
}) {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <SystemContext
      value={{ token, openSidebar, toggleSidebar: (c) => setOpenSidebar(c) }}
    >
      {children}
    </SystemContext>
  );
}
