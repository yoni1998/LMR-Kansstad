import { useState } from 'react';
import { submitQuizAnswers } from '../api/submitQuizAnswers';
import { AnswerSubmission, AnswerValidationResult } from '../model/quiz.types';
import { answerValidationResultSchema } from './../model/quiz.schema';

export function useSubmitQuizAnswers() {
  const [result, setResult] = useState<AnswerValidationResult>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function submit(payload: AnswerSubmission) {
    setIsPending(true);
    setIsError(false);

    try {
      const answers = await submitQuizAnswers(payload);
      const validation = answerValidationResultSchema.safeParse(answers);

      if (!validation.success) {
        throw new Error('Invalid quiz response');
      }

      setResult(validation.data);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return {
    submit,
    result,
    isPending,
    isError,
    isSuccess: result !== undefined,
  };
}
