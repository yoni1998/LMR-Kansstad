import type {
  AnswerSubmission,
  AnswerValidationResult,
} from '../model/quiz.types';
import { API } from './api.config';

export async function submitQuizAnswers(
  payload: AnswerSubmission,
): Promise<AnswerValidationResult> {
  const response = await fetch(API.ENDPOINTS.QUIZ.VALIDATE_ANSWERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Answers could not be validated.');
  }

  return response.json();
}
