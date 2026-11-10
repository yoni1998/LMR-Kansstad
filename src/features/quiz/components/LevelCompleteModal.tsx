import { Button } from '@/components/Button';
import { Modal, ModalDescription } from '@/components/modal/Modal';
import { ProgressBar } from '@/components/ProgressBar';

type LevelCompleteModalProps = {
  level: number;
  maxLevel: number;
  message: string;
  actionLabel: string;
  onContinue: () => void;
};

export function LevelCompleteModal({
  level,
  maxLevel,
  message,
  actionLabel,
  onContinue,
}: LevelCompleteModalProps) {
  return (
    <Modal open={true} title={`Level ${level} voltooid!`} dismissible={false}>
      <ProgressBar value={level} max={maxLevel} className="w-2/3 rounded-md" />
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
