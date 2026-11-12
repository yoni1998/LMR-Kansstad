type ProgressBarProps = {
  value: number;
  max: number;
  className?: string;
};

export function ProgressBar({ value, max, className = '' }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? (clamped / max) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-label="Quizvoortgang"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      className={`bg-blue-frame relative h-2.5 overflow-hidden rounded-sm ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-stripes-yellow motion-safe:animate-stripes h-full min-w-3 rounded-xs transition-[width] duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
