import 'server-only';

import { cacheLife } from 'next/cache';
import { QuizQuestion } from '../model/quiz.types';
import { API } from './api.config';

export const getQuizData = async (): Promise<QuizQuestion[]> => {
  'use cache';
  cacheLife('max');

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.QUIZ.GET_ALL}`);

  if (!response.ok) {
    throw new Error('Failed to fetch quiz data');
  }

  return response.json();
};
