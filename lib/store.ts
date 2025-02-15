import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TypingStats {
  wpm: number[];
  raw: number[];
  errors: number[];
  accuracy: number;
  time: number | null;
  isComplete: boolean;
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    missed: number;
  };
  totalErrors: number;
}

interface TypingStore {
  stats: TypingStats;
  currentTheme: string | null;
  settings: {
    showErrors: boolean;
    soundEffects: boolean;
  };
  setSettings: (settings: Partial<TypingStore['settings']>) => void;
  setCurrentTheme: (theme: string) => void;
  addWPMSample: (wpm: number, raw: number, errors: number) => void;
  updateAccuracy: (accuracy: number) => void;
  updateCharacters: (chars: TypingStats['characters']) => void;
  setComplete: (time: number) => void;
  resetStats: () => void;
}

interface Session {
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  } | null;
}

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialStats: TypingStats = {
  wpm: [],
  raw: [],
  errors: [],
  accuracy: 0,
  time: null,
  isComplete: false,
  characters: {
    correct: 0,
    incorrect: 0,
    extra: 0,
    missed: 0
  },
  totalErrors: 0
};

export const useTypingStore = create<TypingStore>()(
  persist(
    (set) => ({
      stats: initialStats,
      currentTheme: null,
      settings: {
        showErrors: true,
        soundEffects: false,
      },
      setSettings: (newSettings) => 
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        })),
      setCurrentTheme: (theme) => set({ currentTheme: theme }),
      addWPMSample: (wpm, raw, errors) =>
        set((state) => ({
          stats: {
            ...state.stats,
            wpm: [...state.stats.wpm, wpm],
            raw: [...state.stats.raw, raw],
            errors: [...state.stats.errors, errors],
            totalErrors: errors
          }
        })),
      updateAccuracy: (accuracy) =>
        set((state) => ({
          stats: {
            ...state.stats,
            accuracy
          }
        })),
      updateCharacters: (chars) =>
        set((state) => ({
          stats: {
            ...state.stats,
            characters: chars
          }
        })),
      setComplete: (time) =>
        set((state) => ({
          stats: {
            ...state.stats,
            isComplete: true,
            time
          }
        })),
      resetStats: () => set({ stats: initialStats })
    }),
    {
      name: 'typing-store',
      partialize: (state) => ({ 
        settings: state.settings,
        currentTheme: state.currentTheme 
      })
    }
  )
);

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: true,
  setSession: (session) => set({ session }),
  setIsLoading: (isLoading) => set({ isLoading }),
})); 