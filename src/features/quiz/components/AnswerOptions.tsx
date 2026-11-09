import { getOptionState } from '../model/quiz.helpers';
import type {
  QuizAnswer,
  ValidateQuizAnswersResponse,
} from '../model/quiz.types';
import { OptionButton } from './OptionButton';

type AnswerOptionsProps = {
  answers: QuizAnswer[];
  selectedAnswers: readonly string[];
  result?: ValidateQuizAnswersResponse;
  disabled: boolean;
  onToggle: (answer: string) => void;
};

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
