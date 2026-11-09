'use client';

import { Button } from '@/components/Button';
import { HelpIcon } from '@/components/icons/HelpIcon';
import { MapIcon } from '@/components/icons/MapIcon';
import { MuteIcon } from '@/components/icons/MuteIcon';
import { RedoIcon } from '@/components/icons/RedoIcon';
import { useQuizStore } from '../../model/quiz.store';

export function PanelControls() {
  const reset = useQuizStore((state) => state.reset);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-start">
      <Button color="blue-dark" icon={<HelpIcon />} aria-label="Hulp" />
      <Button
        color="blue-dark"
        icon={<RedoIcon />}
        aria-label="Opnieuw starten"
        onClick={reset}
      />
      <Button
        color="blue-dark"
        icon={<MuteIcon />}
        aria-label="Muziek uitzetten"
      />

      <Button color="yellow" icon={<MapIcon />} className="w-max">
        Naar de kaart
      </Button>
    </div>
  );
}
