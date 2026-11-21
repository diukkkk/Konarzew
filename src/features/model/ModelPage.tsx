import { useState } from 'react';
import { pl } from '../../i18n/pl';
import { Sheet } from '../../ui/Sheet';

/**
 * Widok Model: cały ekran na scenę 3D (T03) + wysuwany panel szczegółów (T06).
 * Na razie zastępczy prostokąt i przycisk otwierający panel.
 */
export function ModelPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-full w-full" data-testid="model-page">
      <div
        data-testid="scene-slot"
        className="flex h-full w-full items-center justify-center bg-gradient-to-b from-sky-100 to-lime-100 p-6 text-center text-stone-600"
      >
        {pl.pages.model.placeholder}
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 min-h-11 rounded-full bg-white px-4 font-medium shadow"
      >
        {pl.pages.model.details}
      </button>
      <Sheet open={open} title={pl.pages.model.details} onClose={() => setOpen(false)}>
        <p className="text-stone-600">{pl.pages.model.detailsEmpty}</p>
      </Sheet>
    </div>
  );
}
