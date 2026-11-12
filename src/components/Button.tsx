import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

type BaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: Color;
  ref?: Ref<HTMLButtonElement>;
};

type TextButtonProps = BaseProps & {
  icon?: ReactNode;
};

type IconOnlyButtonProps = BaseProps & {
  icon: ReactNode;
  'aria-label': string; // verplicht zonder zichtbare tekst
};

type ButtonProps = TextButtonProps | IconOnlyButtonProps;

type Color = 'yellow' | 'white' | 'blue-dark';

// Elke kleur bevat zijn eigen tekstkleur en onderrand
const colors: Record<Color, string> = {
  yellow:
    'bg-yellow text-blue-dark shadow-[0_4px_0_0_var(--color-yellow-shadow)]',
  white: 'bg-white text-blue-dark shadow-[0_4px_0_0_var(--color-grey-light)]',
  'blue-dark':
    'bg-blue-dark text-white shadow-[0_4px_0_0_var(--color-darkest-blue)]',
};

const baseStyles =
  'inline-flex items-center justify-center gap-3 font-bold rounded-lg ' +
  'transition-[filter,transform] cursor-pointer ' +
  'hover:brightness-95 active:translate-y-px ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ' +
  'disabled:pointer-events-none disabled:bg-grey-light ' +
  'disabled:shadow-[0_4px_0_var(--color-grey-dark)]';

const buttonStyles = {
  text: 'px-16 py-3 text-button-sm',
  iconText: 'size-13 px-3 py-3 text-button-sm',
  iconOnly: 'w-fit p-4 size-13',
};

function getButtonStyle(hasIcon: boolean, hasText: boolean) {
  if (!hasText) return 'iconOnly';
  return hasIcon ? 'iconText' : 'text';
}

export function Button({
  color,
  icon,
  className = '',
  type = 'button',
  children,
  ref,
  ...props
}: ButtonProps) {
  const buttonStyle = getButtonStyle(Boolean(icon), children != null);

  const iconElement = icon && (
    <span aria-hidden="true" className="flex [&>svg]:size-6">
      {icon}
    </span>
  );

  return (
    <button
      type={type}
      className={`${baseStyles} ${colors[color]} ${buttonStyles[buttonStyle]} ${className}`}
      ref={ref}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  );
}
