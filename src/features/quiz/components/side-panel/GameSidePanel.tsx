'use client';

import { useState, type ReactNode } from 'react';
import type { ImageProps } from 'next/image';

import { ProgressBar } from '@/components/ProgressBar';
import { Surface } from '@/components/Surface';
import { toLevel } from '../../model/quiz.helpers';
import { useQuizStore } from '../../model/quiz.store';
import { CountdownTimer } from '../CountdownTimer';
import { PanelBanner } from './PanelBanner';
import { PanelControls } from './PanelControls';
import { PanelExplanationBlock } from './PanelExplanationBlock';

type GameSidePanelProps = {
  title: string;
  description: ReactNode;
  bannerSrc: ImageProps['src'];
  avatarSrc: ImageProps['src'];
  progressMax: number;
};

const ONE_HOUR_MS = 60 * 60 * 1000;

export function GameSidePanel({
  title,
  description,
  bannerSrc,
  avatarSrc,
  progressMax,
}: GameSidePanelProps) {
  const [testExpiresAt] = useState(() => Date.now() + ONE_HOUR_MS);

  const level = useQuizStore((s) => toLevel(s.currentQuestionIndex));

  return (
    <aside className="panel gap-3">
      <div className="flex flex-1 flex-col rounded-lg bg-white">
        <PanelBanner bannerSrc={bannerSrc} avatarSrc={avatarSrc}>
          <Surface className="h-9 rounded-md px-2">
            <CountdownTimer expiresAt={testExpiresAt} size="sm" />
          </Surface>
          <Surface className="flex w-full items-center rounded-md px-2">
            <ProgressBar
              value={level}
              max={progressMax}
              className="flex-1 rounded-sm"
              thickness="lg"
            />
            <p>
              Level {level} / {progressMax}
            </p>
          </Surface>
        </PanelBanner>

        <div className="flex flex-col items-center gap-4 px-4 pt-14 text-center">
          <PanelExplanationBlock title={title} description={description} />
        </div>
      </div>

      <PanelControls />
    </aside>
  );
}
