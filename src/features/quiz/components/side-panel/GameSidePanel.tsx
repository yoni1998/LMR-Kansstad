'use client';

import type { ReactNode } from 'react';
import type { ImageProps } from 'next/image';

import { ProgressBar } from '@/components/Progressbar';
import { Surface } from '@/components/Surface';
import { useQuizStore } from '../../model/quiz.store';
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
  onTimerComplete?: () => void;
  className?: string;
};

export function GameSidePanel({
  title,
  description,
  bannerSrc,
  avatarSrc,
  progressMax,
  timerDuration,
  onTimerComplete,
  className = '',
}: GameSidePanelProps) {
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex + 1,
  );

  return (
    <aside
      className={`bg-blue-background flex flex-col gap-3 rounded-2xl p-4 ${className}`}
    >
      <div className="flex flex-1 flex-col rounded-sm bg-white">
        <PanelBanner
          bannerSrc={bannerSrc}
          avatarSrc={avatarSrc}
          avatarAlt={`${title} avatar image`}
          bannerAlt={`${title} banner image`}
        >
          <Surface className="h-9 rounded-md px-2">
            <CountdownTimer
              duration={timerDuration}
              onComplete={onTimerComplete}
              size="sm"
            />
          </Surface>
          <Surface className="flex w-full items-center rounded-md px-2">
            <ProgressBar
              value={currentQuestionIndex}
              max={progressMax}
              className="flex-1 rounded-sm"
              thickness="lg"
            />
            <p>
              Level {currentQuestionIndex} / {progressMax}
            </p>
          </Surface>
        </PanelBanner>

        <div className="flex flex-col items-center gap-4 px-4 pt-14 text-center">
          <JobPlate title={title} description={description} />
        </div>
      </div>

      <PanelControls />
    </aside>
  );
}
