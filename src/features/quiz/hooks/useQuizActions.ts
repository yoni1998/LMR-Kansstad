import { useShallow } from 'zustand/shallow';
import { useQuizStore } from '../model/quiz.store';

export const useQuizActions = () =>
  useQuizStore(
    useShallow((s) => ({
      startTimer: s.startTimer,
      nextQuestion: s.nextQuestion,
      incrementScore: s.incrementScore,
      reset: s.reset,
    })),
  );
