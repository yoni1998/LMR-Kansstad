import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, type Color } from '@/components/styles';

type BaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: Color;
  rounded?: boolean;
};

type TextButtonProps = BaseProps & {
  icon?: ReactNode;
};

type IconOnlyButtonProps = BaseProps & {
  icon: ReactNode;
  'aria-label': string; // verplicht zonder zichtbare tekst
};

type ButtonProps = TextButtonProps | IconOnlyButtonProps;

const baseStyles =
  'inline-flex items-center justify-center gap-3 font-bold ' +
  'transition-[filter,transform] cursor-pointer ' +
  'hover:brightness-95 active:translate-y-px ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-medium ' +
  'disabled:pointer-events-none disabled:bg-grey-light ' +
  'disabled:[--edge:var(--color-grey-dark)] disabled:shadow-[0_4px_0_var(--edge)]';

const buttonStyles = {
  text: 'px-16 py-3 text-button-sm shadow-[0_4px_0_0_var(--edge)]',
  iconText: 'size-13 px-3 py-3 text-button-sm shadow-[0_4px_0_0_var(--edge)]',
  iconOnly: 'w-fit p-4 size-13 shadow-[0_4px_0_0_var(--edge)]',
};

function getButtonStyle(hasIcon: boolean, hasText: boolean) {
  if (!hasText) return 'iconOnly';
  return hasIcon ? 'iconText' : 'text';
}

export function Button({
  color,
  rounded = false,
  icon,
  className = '',
  type = 'button',
  children,
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
      className={`${baseStyles} ${rounded ? 'rounded-full' : 'rounded-lg'} ${colors[color]} ${buttonStyles[buttonStyle]} ${className}`}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  );
}
