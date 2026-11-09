'use client';

import { useEffect, useRef, useState } from 'react';
import { TimerIcon } from '@/components/icons/TimerIcon';

type CountdownTimerProps = {
  duration: number;
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
  className?: string;
};

const sizes = {
  lg: 'text-xl h-12 w-28 gap-2 px-4',
  md: 'text-base h-12 w-20 gap-2 px-4',
  sm: 'text-button-sm h-9 w-21 gap-1.5 px-2.5',
};

const iconSizes = {
  lg: 'size-6 shrink-0',
  md: 'size-5 shrink-0',
  sm: 'size-4 shrink-0',
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function CountdownTimer({
  duration,
  size = 'md',
  onComplete,
  className = '',
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(duration);

  // Houdt de nieuwste callback bij zonder de timer te herstarten
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const endsAt = Date.now() + duration * 1000;

    const id = setInterval(() => {
      const left = Math.ceil((endsAt - Date.now()) / 1000);
      setRemaining(left);

      if (left === 0) {
        clearInterval(id);
        onCompleteRef.current?.();
      }
    }, 250);

    return () => clearInterval(id);
  }, [duration]);

  return (
    <div
      role="timer"
      aria-label="Resterende tijd"
      className={`flex items-center justify-center font-bold ${sizes[size]} ${className}`}
    >
      <TimerIcon aria-hidden="true" className={iconSizes[size]} />

      <span className="w-12 shrink-0 text-center tabular-nums">
        {formatTime(remaining)}
      </span>
    </div>
  );
}
