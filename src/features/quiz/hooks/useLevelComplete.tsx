import { useState } from 'react';
import { LevelCompleteModal } from '../components/LevelCompleteModal';

type LevelMessageParams = {
  isLastLevel: boolean;
  isAllCorrect: boolean;
  isTimeUp: boolean;
  finalScore: number;
  totalQuestions: number;
};

function getLevelMessage({
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

type UseShowLevelResultParams = {
  level: number;
  totalQuestions: number;
  isLastLevel: boolean;
  isAllCorrect: boolean;
  isTimeUp: boolean;
  finalScore: number;
  onContinue: (isAllCorrect: boolean) => void;
};

export function useShowLevelResult({
  level,
  totalQuestions,
  isLastLevel,
  isAllCorrect,
  isTimeUp,
  finalScore,
  onContinue,
}: UseShowLevelResultParams) {
  const [isOpen, setIsOpen] = useState(false);

  function showResult() {
    if (isAllCorrect && finalScore === totalQuestions) {
      new Audio('/audio/applause.mp3').play().catch(() => {
        // eslint-disable-next-line no-console
        console.error('Audio is not available');
      });
    }

    setIsOpen(true);
  }

  const modal = isOpen && (
    <LevelCompleteModal
      open={isOpen}
      level={level}
      maxLevel={totalQuestions}
      message={getLevelMessage({
        isLastLevel,
        isAllCorrect,
        isTimeUp,
        finalScore,
        totalQuestions,
      })}
      actionLabel={isLastLevel ? 'Opnieuw' : 'Volgend level'}
      onContinue={() => {
        setIsOpen(false);
        onContinue(isAllCorrect);
      }}
    />
  );

  return { showResult, modal };
}
