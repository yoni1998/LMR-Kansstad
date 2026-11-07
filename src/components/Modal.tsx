'use client';

import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  dismissible?: boolean; // false: sluiten met Escape of buiten klikken is uitgeschakeld
  children?: ReactNode;
  className?: string;
};

function Screw({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-primary-grey-light absolute size-5 rounded-full shadow-[inset_-2px_-2px_0_0_var(--color-secondary-grey-dark)] ${className}`}
    />
  );
}

export function Modal({
  open,
  onOpenChange,
  title,
  dismissible = true,
  children,
  className = '',
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-darkest-blue/70 motion-safe:animate-overlay-in fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Content
              onEscapeKeyDown={(e) => {
                if (!dismissible) e.preventDefault();
              }}
              onInteractOutside={(e) => {
                if (!dismissible) e.preventDefault();
              }}
              className={`bg-primary-white motion-safe:animate-modal-in relative flex w-full max-w-100 flex-col items-center gap-6 rounded-lg px-12 py-12 text-center ${className}`}
            >
              <Screw className="top-4 left-4" />
              <Screw className="top-4 right-4" />
              <Screw className="bottom-4 left-4" />
              <Screw className="right-4 bottom-4" />

              <Dialog.Title className="text-h2 text-primary-blue-dark font-bold">
                {title}
              </Dialog.Title>

              {children}
            </Dialog.Content>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ModalDescription({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Description
      className={`text-body text-primary-blue-dark font-light ${className}`}
    >
      {children}
    </Dialog.Description>
  );
}
