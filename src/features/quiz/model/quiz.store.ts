import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type QuizState = {
  currentQuestionIndex: number;
  score: number;
  expiresAt: number | null;
  startTimer: (duration: number) => void;
  nextQuestion: (duration: number) => void;
  incrementScore: () => void;
  reset: () => void;
};

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  expiresAt: null,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      ...initialState,

      startTimer: (duration) =>
        set({
          expiresAt: Date.now() + duration * 1000,
        }),

      nextQuestion: (duration) =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          expiresAt: Date.now() + duration * 1000,
        })),

      incrementScore: () =>
        set((state) => ({
          score: state.score + 1,
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
