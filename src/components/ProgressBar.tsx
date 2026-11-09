type ProgressBarProps = {
  value: number;
  max: number;
  thickness?: 'sm' | 'md' | 'lg';
  className?: string;
};

const thicknesses = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
};

export function ProgressBar({
  value,
  max = 100,
  thickness = 'md',
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? (clamped / max) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-label="Quizvoortgang"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      className={`bg-blue-frame relative overflow-hidden ${thicknesses[thickness]} ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-stripes-yellow motion-safe:animate-stripes h-full min-w-3 rounded-xs transition-[width] duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
