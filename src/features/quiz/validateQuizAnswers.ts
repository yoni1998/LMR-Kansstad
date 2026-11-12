import 'server-only';

import { NotFoundError } from '@/libs/errors';
import { getQuizData } from './api/getQuizData.api';
import type {
  AnswerSubmission,
  AnswerValidationResult,
} from './model/quiz.types';

export async function validateQuizAnswers({
  questionIndex,
  selectedAnswers,
}: AnswerSubmission): Promise<AnswerValidationResult> {
  const quizData = await getQuizData();
  const question = quizData[questionIndex];

  if (!question) {
    throw new NotFoundError('Question not found');
  }

  const selectedSet = new Set(selectedAnswers);

  const answers = question.answers.map(({ answer, correct }) => ({
    answer,
    selected: selectedSet.has(answer),
    correct: correct === true,
  }));

  const isCorrect = answers.every(
    ({ selected, correct }) => selected === correct,
  );

  return { answers, isCorrect };
}
