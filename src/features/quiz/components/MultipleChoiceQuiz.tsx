'use client';

import { useState } from 'react';

import { Surface } from '@/components/Surface';
import { useShowLevelResult } from '../hooks/useLevelComplete';
import { useSubmitQuizAnswers } from '../hooks/useSubmitQuizAnswers';
import { toLevel } from '../model/quiz.helpers';
import { QuizAnswer } from '../model/quiz.types';
import { AnswerOptions } from './AnswerOptions';
import { CountdownTimer } from './CountdownTimer';
import { QuestionActions } from './QuestionActions';

type MultipleChoiceQuizPanelProps = {
  questionIndex: number;
  totalQuestions: number;
  score: number;
  question: string;
  expiresAt: number;
  answers: QuizAnswer[];
  onContinue: (isAllCorrect: boolean) => void;
};

export function MultipleChoiceQuiz({
  questionIndex,
  totalQuestions,
  score,
  question,
  expiresAt,
  answers,
  onContinue,
}: MultipleChoiceQuizPanelProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const level = toLevel(questionIndex);

  const { submit, result, isPending, isError, isSuccess } =
    useSubmitQuizAnswers();

  const { showResult } = useShowLevelResult({
    level,
    totalQuestions,
    isLastLevel: level === totalQuestions,
    isAllCorrect: result?.isCorrect ?? false,
    isTimeUp,
    finalScore: score + (result?.isCorrect ? 1 : 0),
    onContinue,
  });

  // Toggles an answer: removes it if already selected, adds it if not selected.
  function toggleAnswer(answer: string) {
    setSelectedAnswers((current) =>
      current.includes(answer)
        ? current.filter((item) => item !== answer)
        : [...current, answer],
    );
  }

  function handleSubmitAnswers() {
    // Guard against double submits.
    if (isSuccess || isPending) return;
    submit({ questionIndex, selectedAnswers });
  }

  function handleTimerComplete() {
    // Lock the question and auto-submit whatever is selected (possibly nothing),
    // so the correct answers are revealed.
    setIsTimeUp(true);
    handleSubmitAnswers();
  }

  const isSubmitDisabled =
    !isSuccess && !isPending && (selectedAnswers.length > 0 || isTimeUp);

  const showTimer = !isSuccess && !isTimeUp;

  return (
    <section className="panel">
      <div className="bg-darkest-blue flex flex-1 flex-col items-center gap-8 rounded-md px-4 py-3 md:px-12">
        {/* Fixed height so the layout doesn't shift when the timer disappears */}
        <div className="min-h-12">
          {showTimer && (
            <Surface
              color="white"
              className="min-h-10 rounded-full [--edge:var(--color-blue-dark)]!"
            >
              <CountdownTimer
                expiresAt={expiresAt}
                onComplete={handleTimerComplete}
                size="lg"
              />
            </Surface>
          )}
        </div>
        <h2 className="text-h3 max-w-xl text-center font-bold text-white">
          {question}
        </h2>
        <AnswerOptions
          answers={answers}
          selectedAnswers={selectedAnswers}
          result={result}
          disabled={isSuccess || isPending || isTimeUp}
          onToggle={toggleAnswer}
        />
        <QuestionActions
          hasError={isError}
          isSuccess={isSuccess}
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={handleSubmitAnswers}
          onShowResult={showResult}
        />
      </div>
    </section>
  );
}
