'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Surface } from '@/components/Surface';
import type { QuizQuestion } from '../model/quiz.types';
import { useSubmitQuizAnswers } from '../useSubmitQuizAnswers';
import { CountdownTimer } from './CountdownTimer';
import { OptionButton } from './OptionButton';

const QUESTION_INDEX = 0;
const COUNTDOWN_DURATION = 200;

type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';

type CheckedAnswer = { answer: string; correct: boolean; selected: boolean };

function getOptionState(
  answer: string,
  selectedAnswers: string[],
  checkedAnswers?: CheckedAnswer[],
): OptionState {
  const checked = checkedAnswers?.find((item) => item.answer === answer);

  if (checked) {
    if (checked.correct) return 'correct';
    return checked.selected ? 'incorrect' : 'default';
  }

  return selectedAnswers.includes(answer) ? 'selected' : 'default';
}

type QuestionPanelProps = {
  questions: QuizQuestion[];
  className?: string;
};

export function QuestionPanel({
  questions,
  className = '',
}: QuestionPanelProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const { mutate, data: result, isPending, isSuccess } = useSubmitQuizAnswers();

  const question = questions[QUESTION_INDEX];
  const isLocked = isPending || isSuccess;

  function toggleAnswer(answer: string) {
    setSelectedAnswers((current) =>
      current.includes(answer)
        ? current.filter((item) => item !== answer)
        : [...current, answer],
    );
  }

  function handleCheck() {
    mutate({ questionIndex: QUESTION_INDEX, selectedAnswers });
  }

  return (
    <section
      className={`bg-blue-background flex flex-col rounded-2xl p-4 ${className}`}
    >
      <div className="bg-darkest-blue flex flex-1 flex-col items-center gap-8 rounded-md px-4 py-3 md:px-12">
        <div className="h-10">
          <Surface
            color="secondary"
            className="h-10 rounded-full [--edge:var(--color-primary-blue-dark)]!"
          >
            <CountdownTimer size="lg" duration={COUNTDOWN_DURATION} />
          </Surface>
        </div>

        <h1 className="text-h3 text-primary-white max-w-xl text-center font-bold">
          {question.question}
        </h1>

        <div className="@container w-full">
          <div
            role="group"
            aria-label="Antwoordmogelijkheden"
            className="grid grid-cols-1 gap-3 md:gap-x-8 md:gap-y-6 @md:grid-cols-2"
          >
            {question.answers.map(({ answer }) => (
              <OptionButton
                key={answer}
                state={getOptionState(answer, selectedAnswers, result?.answers)}
                disabled={isLocked}
                onClick={() => toggleAnswer(answer)}
              >
                {answer}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="mt-auto mb-6 flex h-40 w-full max-w-100 flex-col justify-end gap-4">
          <Button
            variant="primary"
            className="w-full"
            disabled={selectedAnswers.length === 0 || isLocked}
            onClick={handleCheck}
          >
            Klaar!
          </Button>

          <Button variant="secondary" className="w-full">
            Geef me een tip...
          </Button>
        </div>
      </div>
    </section>
  );
}
