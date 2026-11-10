import { useState } from 'react';
import { submitQuizAnswers } from '../api/submitQuizAnswers';
import {
  ValidateQuizAnswersRequest,
  ValidateQuizAnswersResponse,
} from '../model/quiz.types';

export function useSubmitQuizAnswers() {
  const [result, setResult] = useState<ValidateQuizAnswersResponse>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function submit(payload: ValidateQuizAnswersRequest) {
    setIsPending(true);
    setIsError(false);

    try {
      const answers = await submitQuizAnswers(payload);
      setResult(answers);
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
