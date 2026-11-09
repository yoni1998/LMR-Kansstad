'use client';

import { useState } from 'react';

import { ModalContext, type ModalOptions } from './ModalContext';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalOptions | null>(null);

  const openModal = (options: ModalOptions) => setModal(options);

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal?.content}
    </ModalContext.Provider>
  );
}
