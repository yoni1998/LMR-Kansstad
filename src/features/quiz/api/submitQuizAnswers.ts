import type {
  ValidateQuizAnswersRequest,
  ValidateQuizAnswersResponse,
} from '../model/quiz.types';
import { API } from './api.config';

export async function submitQuizAnswers(
  payload: ValidateQuizAnswersRequest,
): Promise<ValidateQuizAnswersResponse> {
  const response = await fetch(API.ENDPOINTS.QUIZ.VALIDATE_ANSWERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Antwoorden konden niet worden gecontroleerd.');
  }

  return response.json();
}
