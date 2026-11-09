import type { ReactNode } from 'react';
import { type Color, colors } from '@/components/styles';

type SurfaceProps = {
  children: ReactNode;
  color?: Color;
  className?: string;
};

export function Surface({
  children,
  color = 'blue-medium',
  className = '',
}: SurfaceProps) {
  return (
    <div
      className={`text-button-sm flex items-center gap-2 font-bold shadow-[0_4px_0_0_var(--edge)] ${colors[color]} ${className}`}
    >
      {children}
    </div>
  );
}
