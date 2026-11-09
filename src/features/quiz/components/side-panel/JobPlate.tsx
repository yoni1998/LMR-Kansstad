import type { ReactNode } from 'react';

import { UnderlinedHeading } from '@/components/UnderlinedHeading';

type JobPlateProps = {
  title: string;
  description: ReactNode;
};

export function JobPlate({ title, description }: JobPlateProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <UnderlinedHeading as="h2">{title}</UnderlinedHeading>
      <div className="text-body-sm text-blue-dark mb-4 font-light">
        {description}
      </div>
    </div>
  );
}
