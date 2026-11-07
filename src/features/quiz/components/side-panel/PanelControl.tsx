'use client';

import { Button } from '@/components/Button';
import { HelpIcon } from '@/components/icons/HelpIcon';
import { MapIcon } from '@/components/icons/MapIcon';
import { MuteIcon } from '@/components/icons/MuteIcon';
import { RedoIcon } from '@/components/icons/RedoIcon';

export function PanelControls() {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-start">
      <Button variant="blue-dark" icon={<HelpIcon />} aria-label="Hulp" />
      <Button
        variant="blue-dark"
        icon={<RedoIcon />}
        aria-label="Opnieuw starten"
      />
      <Button
        variant="blue-dark"
        icon={<MuteIcon />}
        aria-label="Muziek uitzetten"
      />

      <Button variant="primary" icon={<MapIcon />} className="w-max">
        Naar de kaart
      </Button>
    </div>
  );
}
