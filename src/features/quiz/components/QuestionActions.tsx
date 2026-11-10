import { useEffect, useRef } from 'react';
import { Button } from '@/components/Button';

type QuestionActionsProps = {
  hasError: boolean;
  isSuccess: boolean;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  onShowResult: () => void;
};

const WRAPPER_CLASS_NAME =
  'mt-auto mb-6 flex min-h-40 w-full max-w-100 flex-col justify-end gap-4';

export function QuestionActions({
  hasError,
  isSuccess,
  isSubmitDisabled,
  onSubmit,
  onShowResult,
}: QuestionActionsProps) {
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuccess) {
      continueButtonRef.current?.focus();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className={WRAPPER_CLASS_NAME}>
        <Button
          ref={continueButtonRef}
          color="yellow"
          onClick={onShowResult}
          className="w-full"
        >
          Doorgaan
        </Button>
      </div>
    );
  }

  return (
    <div className={WRAPPER_CLASS_NAME}>
      {hasError && (
        <p role="alert" className="text-body-sm text-error text-center">
          Antwoorden konden niet worden gecontroleerd. Probeer opnieuw.
        </p>
      )}

      <Button
        color="yellow"
        disabled={!isSubmitDisabled}
        onClick={onSubmit}
        className="w-full"
      >
        Klaar!
      </Button>
      <Button color="white" className="w-full">
        Geef me een tip...
      </Button>
    </div>
  );
}
