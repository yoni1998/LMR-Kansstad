import type { z } from 'zod';
import { ValidateQuizAnswersRequestSchema } from './quiz.schema';

export type QuizAnswer = {
  answer: string;
  correct?: boolean;
};

export type QuizQuestion = {
  question: string;
  time_limit_s: number;
  answers: QuizAnswer[];
};

export type QuizAnswerResult = {
  answer: string;
  selected: boolean;
  correct: boolean;
};

export type ValidateQuizAnswersRequest = z.infer<
  typeof ValidateQuizAnswersRequestSchema
>;

export type ValidateQuizAnswersResponse = {
  answers: QuizAnswerResult[];
  isCorrect: boolean;
};

export type AnswerOptionState =
  'default' | 'selected' | 'correct' | 'incorrect';
