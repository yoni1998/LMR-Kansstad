import type {
  AnswerOptionState,
  QuizAnswer,
  AnswerValidationResult,
} from '../model/quiz.types';
import { OptionButton } from './OptionButton';

type AnswerOptionsProps = {
  answers: QuizAnswer[];
  selectedAnswers: readonly string[];
  result?: AnswerValidationResult;
  disabled: boolean;
  onToggle: (answer: string) => void;
};

function getOptionState(
  answer: string,
  selectedAnswers: readonly string[],
  result?: AnswerValidationResult,
): AnswerOptionState {
  if (!result) {
    return selectedAnswers.includes(answer) ? 'selected' : 'default';
  }

  const checked = result.answers.find((item) => item.answer === answer);

  if (checked?.correct) return 'correct';
  if (checked?.selected) return 'incorrect';
  return 'default';
}

export function AnswerOptions({
  answers,
  selectedAnswers,
  result,
  disabled,
  onToggle,
}: AnswerOptionsProps) {
  return (
    <div className="@container w-full">
      <div
        role="group"
        aria-label="Antwoordmogelijkheden"
        className="grid grid-cols-1 gap-3 md:gap-x-8 md:gap-y-6 @md:grid-cols-2"
      >
        {answers.map(({ answer }) => {
          const state = getOptionState(answer, selectedAnswers, result);

          return (
            <OptionButton
              key={answer}
              state={state}
              aria-pressed={selectedAnswers.includes(answer)}
              disabled={disabled}
              onClick={() => onToggle(answer)}
            >
              {answer}
            </OptionButton>
          );
        })}
      </div>
    </div>
  );
}
