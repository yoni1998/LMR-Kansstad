import type { ReactNode } from 'react';

type SurfaceProps = {
  children: ReactNode;
  color?: Color;
  className?: string;
};

type Color = 'white' | 'blue-medium';

const colors: Record<Color, string> = {
  white: 'bg-white text-blue-dark',
  'blue-medium': 'bg-blue-medium text-white ',
};

export function Surface({
  children,
  color = 'blue-medium',
  className = '',
}: SurfaceProps) {
  return (
    <div
      className={`text-button-sm flex items-center gap-2 font-bold shadow-[0_4px_0_0_var(--color-blue-dark)] ${colors[color]} ${className}`}
    >
      {children}
    </div>
  );
}
