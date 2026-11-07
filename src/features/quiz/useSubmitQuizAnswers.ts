import { useState } from 'react';
import { submitQuizAnswers } from './api/submitQuizAnswers';
import {
  ValidateQuizAnswersRequest,
  ValidateQuizAnswersResponse,
} from './model/quiz.types';

export function useSubmitQuizAnswers() {
  const [data, setData] = useState<ValidateQuizAnswersResponse>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function mutate(payload: ValidateQuizAnswersRequest) {
    setIsPending(true);
    setIsError(false);

    try {
      const answers = await submitQuizAnswers(payload);
      setData(answers);
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return { mutate, data, isPending, isError, isSuccess: data !== undefined };
}
