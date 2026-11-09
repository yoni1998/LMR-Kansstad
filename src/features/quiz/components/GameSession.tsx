'use client';

import { useEffect } from 'react';

import { useShallow } from 'zustand/shallow';
import { useQuizHydration } from '../hooks/useQuizHydration';
import { useQuizStore } from '../model/quiz.store';
import { QuizQuestion } from '../model/quiz.types';
import { MultipleChoiceQuizPanel } from './MultipleChoiceQuizPanel';

type GameSessionProps = {
  questions: QuizQuestion[];
  className?: string;
};

export function GameSession({ questions, className = '' }: GameSessionProps) {
  const questionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const score = useQuizStore((s) => s.score);
  const expiresAt = useQuizStore((s) => s.expiresAt);

  const { startTimer, nextQuestion, incrementScore, reset } = useQuizStore(
    useShallow((s) => ({
      startTimer: s.startTimer,
      nextQuestion: s.nextQuestion,
      incrementScore: s.incrementScore,
      reset: s.reset,
    })),
  );

  const hasHydrated = useQuizHydration();

  const question = questions[questionIndex];
  const nextQuestionData = questions[questionIndex + 1];
  const isLastQuestion = !nextQuestionData;

  useEffect(() => {
    if (!hasHydrated || !question || expiresAt !== null) return;

    startTimer(question.time_limit_s);
  }, [hasHydrated, question, expiresAt, startTimer]);

  function handleContinue(isAllCorrect: boolean) {
    // Laatste level: "Opnieuw" start het spel van voren af aan.
    if (isLastQuestion) return reset();

    if (isAllCorrect) incrementScore();
    nextQuestion(nextQuestionData.time_limit_s);
  }

  if (!hasHydrated) return null;

  if (!question) {
    return (
      <p role="status" className="text-body text-white">
        Geen vragen beschikbaar.
      </p>
    );
  }

  if (expiresAt === null) return null;

  return (
    <MultipleChoiceQuizPanel
      key={questionIndex}
      questionIndex={questionIndex}
      totalQuestions={questions.length}
      score={score}
      question={question.question}
      expiresAt={expiresAt}
      answers={question.answers}
      onContinue={handleContinue}
      className={className}
    />
  );
}
