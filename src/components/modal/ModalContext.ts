import { createContext } from 'react';

export type ModalOptions = {
  content: React.ReactNode;
};

export type ModalContextType = {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
