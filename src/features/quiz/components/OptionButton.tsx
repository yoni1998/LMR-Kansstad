import type { ButtonHTMLAttributes } from 'react';
import { AnswerOptionState } from '../model/quiz.types';

type OptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  state: AnswerOptionState;
};

const baseStyles =
  'flex min-w-0 items-center justify-center gap-6 border-2 font-bold text-blue-dark ' +
  'rounded-lg px-2 py-2.5 text-button-mobile ' +
  'md:px-4 md:py-2 md:text-button ' +
  'transition-colors cursor-pointer disabled:cursor-default enabled:hover:bg-blue-medium enabled:hover:text-white ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ';

const states: Record<AnswerOptionState, string> = {
  default: 'border-3 border-transparent bg-blue-light',
  selected: 'border-3 border-yellow bg-blue-medium text-white',
  correct: 'border-3 border-success bg-white',
  incorrect: 'border-3 border-error bg-white',
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
      <span className="text-center wrap-break-word">{children}</span>
    </button>
  );
}
