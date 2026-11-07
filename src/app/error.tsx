'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p>Er is iets misgelopen bij het laden van de quiz.</p>
      <Button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // haalt server components opnieuw op
            reset(); // wist de foutstatus en rendert opnieuw
          });
        }}
        variant="secondary"
      >
        Probeer opnieuw
      </Button>
    </main>
  );
}
