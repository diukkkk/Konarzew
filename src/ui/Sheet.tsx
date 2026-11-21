import type { ReactNode } from 'react';
import { pl } from '../i18n/pl';
import { IconClose } from './icons';

type SheetProps = { open: boolean; title: string; onClose: () => void; children: ReactNode };

/**
 * Wysuwany panel: na telefonie od dołu, na komputerze z prawej strony.
 * Używany m.in. do szczegółów pinezki (T06).
 */
export function Sheet({ open, title, onClose, children }: SheetProps) {
  if (!open) return null;
  return (
    <aside
      role="dialog"
      aria-label={title}
      className="absolute inset-x-0 bottom-0 z-20 max-h-[70%] overflow-y-auto rounded-t-2xl border border-stone-200 bg-white p-4 shadow-xl lg:inset-y-0 lg:right-0 lg:left-auto lg:max-h-none lg:w-96 lg:rounded-none lg:rounded-l-2xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={pl.common.close}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100"
        >
          <IconClose />
        </button>
      </div>
      {children}
    </aside>
  );
}
