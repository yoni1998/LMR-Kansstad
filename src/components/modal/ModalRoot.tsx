'use client';

import { useModalStore } from './modal.store';

export function ModalRoot() {
  const content = useModalStore((s) => s.content);
  return <>{content}</>;
}
