import type { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type UnderlinedHeadingProps = {
  children: ReactNode;
  as?: HeadingLevel; // Determines the semantic heading level for accessibility, independently of visual styling.
  className?: string;
};

export function UnderlinedHeading({
  children,
  as: Tag = 'h2',
  className = '',
}: UnderlinedHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Tag
        className={`text-h3 text-blue-dark text-center font-bold ${className}`}
      >
        {children}
      </Tag>
      <span
        aria-hidden="true"
        className="bg-blue-medium h-0.5 w-25 rounded-full"
      />
    </div>
  );
}
