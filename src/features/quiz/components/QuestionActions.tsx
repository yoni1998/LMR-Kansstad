import { Button } from '@/components/Button';

type QuestionActionsProps = {
  hasError: boolean;
  isSuccess: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  onShowResult: () => void;
};

const WRAPPER_CLASS_NAME =
  'mt-auto mb-6 flex h-40 w-full max-w-100 flex-col justify-end gap-4';

export function QuestionActions({
  hasError,
  isSuccess,
  canSubmit,
  onSubmit,
  onShowResult,
}: QuestionActionsProps) {
  if (isSuccess) {
    return (
      <div className={WRAPPER_CLASS_NAME}>
        <Button color="yellow" onClick={onShowResult} className="w-full">
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
        disabled={!canSubmit}
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
