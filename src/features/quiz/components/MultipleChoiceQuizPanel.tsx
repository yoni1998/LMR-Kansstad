'use client';

import { useState } from 'react';

import { useModal } from '@/components/modal/useModal';
import { Surface } from '@/components/Surface';
import { useSubmitQuizAnswers } from '../hooks/useSubmitQuizAnswers';
import { getLevelMessage, isFullyCorrect } from '../model/quiz.helpers';
import { QuizAnswer } from '../model/quiz.types';
import { AnswerOptions } from './AnswerOptions';
import { CountdownTimer } from './CountdownTimer';

import { LevelCompleteModal } from './LevelCompleteModal';
import { QuestionActions } from './QuestionActions';

type MultipleChoiceQuizPanelProps = {
  questionIndex: number;
  totalQuestions: number;
  score: number;
  question: string;
  expiresAt: number;
  answers: QuizAnswer[];
  onContinue: (isAllCorrect: boolean) => void;
  className?: string;
};

const getSecondsLeft = (expiresAt: number) =>
  Math.ceil((expiresAt - Date.now()) / 1000);

export function MultipleChoiceQuizPanel({
  questionIndex,
  totalQuestions,
  score,
  question,
  expiresAt,
  answers,
  onContinue,
  className = '',
}: MultipleChoiceQuizPanelProps) {
  const {
    mutate,
    data: result,
    isPending,
    isError,
    isSuccess,
  } = useSubmitQuizAnswers();

  const { openModal, closeModal } = useModal();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isTimeUp, setIsTimeUp] = useState(() => Date.now() >= expiresAt);
  const [timerDuration] = useState(() => getSecondsLeft(expiresAt));

  const level = questionIndex + 1;
  const isLastLevel = level === totalQuestions;
  const isAllCorrect = isFullyCorrect(result);
  const finalScore = score + (isAllCorrect ? 1 : 0);

  const isLocked = isSuccess || isPending || isTimeUp;
  const canSubmit =
    !isSuccess && !isPending && (selectedAnswers.length > 0 || isTimeUp);

  function toggleAnswer(answer: string) {
    setSelectedAnswers((current) =>
      current.includes(answer)
        ? current.filter((item) => item !== answer)
        : [...current, answer],
    );
  }

  function handleSubmitAnswers() {
    if (isSuccess || isPending) return;
    mutate({ questionIndex, selectedAnswers });
  }

  function handleTimerComplete() {
    setIsTimeUp(true);
    handleSubmitAnswers();
  }

  function handleShowResult() {
    if (isAllCorrect && finalScore === totalQuestions) {
      new Audio('/audio/applause.mp3').play();
    }
    openModal({
      content: (
        <LevelCompleteModal
          level={level}
          progressValue={level}
          progressMax={totalQuestions}
          message={getLevelMessage({
            isLastLevel,
            isAllCorrect,
            isTimeUp,
            finalScore,
            totalQuestions,
          })}
          actionLabel={isLastLevel ? 'Opnieuw' : 'Volgend level'}
          onContinue={() => {
            closeModal();
            onContinue(isAllCorrect);
          }}
        />
      ),
    });
  }

  const showTimer = !isSuccess && !isTimeUp;

  return (
    <section
      className={`bg-blue-frame flex flex-col rounded-2xl p-4 ${className}`}
    >
      <div className="bg-darkest-blue flex flex-1 flex-col items-center gap-8 rounded-md px-4 py-3 md:px-12">
        {/* Vaste hoogte zodat de layout niet verspringt als de timer verdwijnt */}
        <div className="min-h-12">
          {showTimer && (
            <Surface
              color="white"
              className="min-h-10 rounded-full [--edge:var(--color-blue-dark)]!"
            >
              <CountdownTimer
                duration={timerDuration}
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
          disabled={isLocked}
          onToggle={toggleAnswer}
        />

        <QuestionActions
          hasError={isError}
          isSuccess={isSuccess}
          canSubmit={canSubmit}
          onSubmit={handleSubmitAnswers}
          onShowResult={handleShowResult}
        />
      </div>
    </section>
  );
}
