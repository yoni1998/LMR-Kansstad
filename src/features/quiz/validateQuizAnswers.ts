import 'server-only';

import { getQuizData } from './api/getQuizData.api';
import type {
  ValidateQuizAnswersRequest,
  ValidateQuizAnswersResponse,
} from './model/quiz.types';

export async function validateQuizAnswers({
  questionIndex,
  selectedAnswers,
}: ValidateQuizAnswersRequest): Promise<ValidateQuizAnswersResponse> {
  const quizData = await getQuizData();
  const question = quizData[questionIndex];

  if (!question) {
    throw new Error('Question not found');
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
