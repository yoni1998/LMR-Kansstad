import { z } from 'zod';

export const quizAnswerSchema = z.object({
  answer: z.string(),
  correct: z.boolean().optional(),
});

export const quizQuestionSchema = z.object({
  question: z.string(),
  time_limit_s: z.number().int().nonnegative(),
  answers: z.array(quizAnswerSchema),
});

export const quizSchema = z.array(quizQuestionSchema);

export const answerResultSchema = z.object({
  answer: z.string(),
  selected: z.boolean(),
  correct: z.boolean(),
});

export const answerSubmissionSchema = z
  .object({
    questionIndex: z.number().int().nonnegative(),
    selectedAnswers: z.array(z.string().min(1)),
  })
  .strict();

export const answerValidationResultSchema = z.object({
  answers: z.array(answerResultSchema),
  isCorrect: z.boolean(),
});
