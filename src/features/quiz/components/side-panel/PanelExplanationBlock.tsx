import type { ReactNode } from 'react';

import { UnderlinedHeading } from '@/components/UnderlinedHeading';

type PanelExplanationBlock = {
  title: string;
  description: ReactNode;
};

export function PanelExplanationBlock({
  title,
  description,
}: PanelExplanationBlock) {
  return (
    <div className="flex flex-col items-center gap-4">
      <UnderlinedHeading as="h1">{title}</UnderlinedHeading>
      <div className="text-body-sm text-blue-dark mb-4 font-light">
        {description}
      </div>
    </div>
  );
}
