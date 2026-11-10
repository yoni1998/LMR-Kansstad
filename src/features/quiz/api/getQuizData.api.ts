import 'server-only';

import { cacheLife } from 'next/cache';
import { quizSchema } from '../model/quiz.schema';
import { QuizQuestion } from '../model/quiz.types';
import { API } from './api.config';

export const getQuizData = async (): Promise<QuizQuestion[]> => {
  'use cache';
  cacheLife('max');

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.QUIZ.GET_ALL}`);

  if (!response.ok) {
    throw new Error('Failed to fetch quiz data');
  }

  const data: unknown = await response.json();

  return quizSchema.parse(data);
};
