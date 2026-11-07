import { z } from 'zod';

export const ValidateQuizAnswersRequestSchema = z
  .object({
    questionIndex: z.number().int().nonnegative(),
    selectedAnswers: z.array(z.string().min(1)),
  })
  .strict();
