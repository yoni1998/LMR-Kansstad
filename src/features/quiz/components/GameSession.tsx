'use client';

import { useEffect } from 'react';

import { useQuizHydration } from '../hooks/useQuizHydration';
import { useQuizStore } from '../model/quiz.store';
import { QuizQuestion } from '../model/quiz.types';
import { MultipleChoiceQuiz } from './MultipleChoiceQuiz';

type GameSessionProps = {
  questions: QuizQuestion[];
};

export function GameSession({ questions }: GameSessionProps) {
  const questionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const score = useQuizStore((s) => s.score);
  const expiresAt = useQuizStore((s) => s.expiresAt);
  const startTimer = useQuizStore((s) => s.startTimer);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);
  const incrementScore = useQuizStore((s) => s.incrementScore);
  const reset = useQuizStore((s) => s.reset);

  const hasHydrated = useQuizHydration();

  const question = questions[questionIndex];
  const nextIndex = questionIndex + 1;
  const nextQuestionData = questions[nextIndex];

  /* Only for the very first question: after a refresh, expiresAt is already
     restored from sessionStorage, so the timer must not restart. */
  useEffect(() => {
    if (!hasHydrated || !question || expiresAt !== null) return;

    startTimer(question.time_limit_s);
  }, [hasHydrated, question, expiresAt, startTimer]);

  function handleContinue(isAllCorrect: boolean) {
    // Last level: "Opnieuw" restarts the game from the beginning.
    if (!nextQuestionData) return reset();

    if (isAllCorrect) incrementScore();
    nextQuestion(nextQuestionData.time_limit_s);
  }

  if (!hasHydrated)
    return (
      <p role="status" className="text-center">
        Quiz wordt geladen...
      </p>
    );

  if (!question) {
    return (
      <p role="status" className="text-center">
        Geen vragen beschikbaar.
      </p>
    );
  }

  // Briefly null between hydration and startTimer.
  if (expiresAt === null) return null;

  /* key forces a fresh mount per question, so the panel's local state
   (selectedAnswers, isTimeUp, mutation) resets automatically. */
  return (
    <MultipleChoiceQuiz
      key={questionIndex}
      questionIndex={questionIndex}
      totalQuestions={questions.length}
      score={score}
      question={question.question}
      expiresAt={expiresAt}
      answers={question.answers}
      onContinue={handleContinue}
    />
  );
}
