import { create } from 'zustand';

interface IGlobalStore {
  sidePanel: boolean;
  toggleSidePanel: () => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  sidePanel: false,
  toggleSidePanel: () => set((state) => ({ sidePanel: !state.sidePanel })),
}));
