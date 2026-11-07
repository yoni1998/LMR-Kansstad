import type { ButtonHTMLAttributes, ReactNode } from 'react';

type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';

type OptionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  state?: OptionState;
  children: ReactNode;
};

const baseStyles =
  'flex min-w-0 items-center justify-center gap-6 border-2 font-bold text-primary-blue-dark ' +
  'rounded-md px-2 py-2.5 text-button-mobile ' +
  'md:px-4 md:py-2 md:text-button ' +
  'transition-colors cursor-pointer disabled:cursor-default enabled:hover:bg-primary-blue-medium enabled:hover:text-primary-white ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue-medium ';

const states: Record<OptionState, string> = {
  default: 'border-2 border-transparent bg-secondary-blue-light',
  selected:
    'border-2 border-secondary-yellow bg-primary-blue-medium text-primary-white',
  correct: 'border-2 border-success bg-primary-white',
  incorrect: 'border-2 border-error bg-primary-white',
};

export function OptionButton({
  state = 'default',
  children,
  className = '',
  ...props
}: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`${baseStyles} ${states[state]} ${className}`}
      {...props}
    >
      <span className="wrap-break-words text-center">{children}</span>
    </button>
  );
}
