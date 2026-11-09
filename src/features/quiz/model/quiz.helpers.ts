import type {
  AnswerOptionState,
  ValidateQuizAnswersResponse,
} from './quiz.types';

export function getOptionState(
  answer: string,
  selectedAnswers: readonly string[],
  result?: ValidateQuizAnswersResponse,
): AnswerOptionState {
  if (!result) {
    return selectedAnswers.includes(answer) ? 'selected' : 'default';
  }

  const checked = result.answers.find((item) => item.answer === answer);

  if (checked?.correct) return 'correct';
  if (checked?.selected) return 'incorrect';
  return 'default';
}

export function isFullyCorrect(result?: ValidateQuizAnswersResponse) {
  return (
    result?.answers.every(
      (item) => Boolean(item.correct) === Boolean(item.selected),
    ) ?? false
  );
}

type LevelMessageParams = {
  isLastLevel: boolean;
  isAllCorrect: boolean;
  isTimeUp: boolean;
  finalScore: number;
  totalQuestions: number;
};

export function getLevelMessage({
  isLastLevel,
  isAllCorrect,
  isTimeUp,
  finalScore,
  totalQuestions,
}: LevelMessageParams) {
  if (isLastLevel) {
    return `Je hebt alle levels gespeeld! Jouw score: ${finalScore} van ${totalQuestions}.`;
  }
  if (isAllCorrect) return 'Woehoew! Alles juist, doe zo verder!';
  if (isTimeUp) return 'Niet vergeten om op tijd te antwoorden!';
  return 'Niet alles was juist, maar je bent er bijna. Op naar de volgende!';
}
