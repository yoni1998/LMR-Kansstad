import type { z } from 'zod';
import {
  answerResultSchema,
  answerSubmissionSchema,
  answerValidationResultSchema,
  quizAnswerSchema,
  quizQuestionSchema,
  quizSchema,
} from './quiz.schema';

export type QuizAnswer = z.infer<typeof quizAnswerSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type Quiz = z.infer<typeof quizSchema>;

export type AnswerResult = z.infer<typeof answerResultSchema>;
export type AnswerSubmission = z.infer<typeof answerSubmissionSchema>;
export type AnswerValidationResult = z.infer<
  typeof answerValidationResultSchema
>;

export type AnswerOptionState =
  'default' | 'selected' | 'correct' | 'incorrect';
