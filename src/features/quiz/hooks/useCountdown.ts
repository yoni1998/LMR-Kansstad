import { useEffect, useState } from 'react';

// Calculate the remaining seconds based on the absolute expiration timestamp.
const getRemainingTime = (expiresAt: number) =>
  Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

export function useCountdown(expiresAt: number, onComplete?: () => void) {
  // Initialize the countdown with the current remaining time.
  const [remaining, setRemaining] = useState(() => getRemainingTime(expiresAt));

  useEffect(() => {
    const id = setInterval(() => {
      // Recalculate from the expiration timestamp to avoid relying on interval accuracy.
      const left = getRemainingTime(expiresAt);
      setRemaining(left);

      // Stop the interval and invoke the completion callback when the timer expires.
      if (left === 0) {
        clearInterval(id);
        onComplete?.();
      }
    }, 250);

    // Clean up the interval when the expiration timestamp changes or the component unmounts.
    return () => clearInterval(id);
  }, [expiresAt, onComplete]);

  return remaining;
}
