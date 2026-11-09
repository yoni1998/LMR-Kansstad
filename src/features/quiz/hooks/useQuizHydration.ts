import { useEffect, useState } from 'react';

import { useQuizStore } from '../model/quiz.store';

export function useQuizHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve(useQuizStore.persist.rehydrate()).then(() =>
      setHasHydrated(true),
    );
  }, []);

  return hasHydrated;
}
