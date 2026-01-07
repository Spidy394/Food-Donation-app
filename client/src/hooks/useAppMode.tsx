import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppMode = 'donor' | 'recipient';

interface AppModeState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

export const useAppMode = create<AppModeState>()(
  persist(
    (set) => ({
      mode: 'recipient',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({ 
        mode: state.mode === 'donor' ? 'recipient' : 'donor' 
      })),
    }),
    {
      name: 'app-mode-storage',
    }
  )
);
