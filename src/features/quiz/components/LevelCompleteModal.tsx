import { Button } from '@/components/Button';
import { Modal, ModalDescription } from '@/components/Modal';
import { ProgressBar } from '@/components/Progressbar';

type LevelCompleteModalProps = {
  open: boolean;
  level: number;
  progressValue: number;
  progressMax: number;
  message: string;
  actionLabel: string;
  onReset: () => void;
};

export function LevelCompleteModal({
  open,
  level,
  progressValue,
  progressMax,
  message,
  actionLabel,
  onReset,
}: LevelCompleteModalProps) {
  return (
    <Modal open={open} title={`Level ${level} voltooid!`} dismissible={false}>
      <ProgressBar
        value={progressValue}
        max={progressMax}
        className="w-2/3 rounded-md"
      />
      <ModalDescription>{message}</ModalDescription>
      <Button color="yellow" onClick={onReset} className="w-11/12">
        {actionLabel}
      </Button>
    </Modal>
  );
}
