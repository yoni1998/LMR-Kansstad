'use client';

import type { ReactNode } from 'react';
import type { ImageProps } from 'next/image';

import { ProgressBar } from '@/components/Progressbar';
import { Surface } from '@/components/Surface';
import { CountdownTimer } from '../CountdownTimer';
import { JobPlate } from './JobPlate';
import { PanelBanner } from './PanelBanner';
import { PanelControls } from './PanelControl';

type GameSidePanelProps = {
  title: string;
  description: ReactNode;
  bannerSrc: ImageProps['src'];
  avatarSrc: ImageProps['src'];
  progressMax: number;
  timerDuration: number;
  children?: ReactNode;
  onTimerComplete?: () => void;
  className?: string;
};

export function GameSidePanel({
  title,
  description,
  children,
  bannerSrc,
  avatarSrc,
  progressMax,
  timerDuration,
  onTimerComplete,
  className = '',
}: GameSidePanelProps) {
  return (
    <aside
      className={`bg-blue-background flex flex-col gap-3 rounded-2xl p-4 ${className}`}
    >
      <div className="bg-primary-white flex flex-1 flex-col rounded-sm">
        <PanelBanner bannerSrc={bannerSrc} avatarSrc={avatarSrc}>
          <Surface className="h-9 rounded-sm px-2">
            <CountdownTimer
              duration={timerDuration}
              onComplete={onTimerComplete}
              size="sm"
            />
          </Surface>
          <Surface className="flex w-full items-center rounded-sm px-2">
            <ProgressBar
              value={2}
              max={progressMax}
              className="flex-1 rounded-sm"
              thickness="lg"
            />
            <p>
              Level {2} / {progressMax}
            </p>
          </Surface>
        </PanelBanner>

        <div className="flex flex-col items-center gap-4 px-4 pt-14 text-center">
          <JobPlate title={title} description={description} />
          {children}
        </div>
      </div>

      <PanelControls />
    </aside>
  );
}
