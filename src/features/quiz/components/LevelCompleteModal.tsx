import { Button } from '@/components/Button';
import { Modal, ModalDescription } from '@/components/modal/Modal';
import { ProgressBar } from '@/components/ProgressBar';

type LevelCompleteModalProps = {
  level: number;
  progressValue: number;
  progressMax: number;
  message: string;
  actionLabel: string;
  onContinue: () => void;
};

export function LevelCompleteModal({
  level,
  progressValue,
  progressMax,
  message,
  actionLabel,
  onContinue,
}: LevelCompleteModalProps) {
  return (
    <Modal open={true} title={`Level ${level} voltooid!`} dismissible={false}>
      <ProgressBar
        value={progressValue}
        max={progressMax}
        className="w-2/3 rounded-md"
      />
      <ModalDescription>{message}</ModalDescription>
      <Button
        color="yellow"
        onClick={onContinue}
        className="focus-visible:outline-darkest-blue! w-11/12"
      >
        {actionLabel}
      </Button>
    </Modal>
  );
}
