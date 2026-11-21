import { Component, lazy, Suspense, type ReactNode } from 'react';
import { breadcrumbFor, labelFor } from '../../core/elementKeys';
import { pl } from '../../i18n/pl';
import { defaultHouseSpec } from '../../model3d';
import { useSelectionStore } from '../../state/selectionStore';
import { useViewStore, type CameraPreset } from '../../state/viewStore';
import { Sheet } from '../../ui/Sheet';

// three.js jest duże — ładujemy scenę osobno, żeby reszta aplikacji startowała szybko.
const Scene = lazy(() => import('../../scene/Scene'));

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Centered>{pl.pages.model.noWebgl}</Centered> : this.props.children;
  }
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center text-stone-600">{children}</div>
  );
}

const presets: { preset: CameraPreset; label: string }[] = [
  { preset: 'dom', label: pl.pages.model.viewHouse },
  { preset: 'ogrod', label: pl.pages.model.viewGarden },
  { preset: 'gora', label: pl.pages.model.viewTop },
  { preset: 'dzialka', label: pl.pages.model.viewPlot },
];

const btn =
  'min-h-11 rounded-full bg-white/95 px-4 text-sm font-medium shadow hover:bg-amber-50 aria-pressed:bg-amber-200';

/** Widok Model: scena 3D na cały ekran + przyciski widoku + panel wybranego elementu. */
export function ModelPage() {
  const selected = useSelectionStore((s) => s.selectedElementKey);
  const clear = useSelectionStore((s) => s.clear);
  const requestCamera = useViewStore((s) => s.requestCamera);
  const mode = useViewStore((s) => s.interiorMode);
  const setMode = useViewStore((s) => s.setInteriorMode);
  const roofHidden = mode !== 'zewnatrz';

  return (
    <div className="relative h-full w-full bg-sky-100" data-testid="model-page">
      <div data-testid="scene-slot" className="absolute inset-0">
        <SceneErrorBoundary>
          <Suspense fallback={<Centered>{pl.pages.model.loading}</Centered>}>
            <Scene spec={defaultHouseSpec} />
          </Suspense>
        </SceneErrorBoundary>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-2 p-3">
        {presets.map(({ preset, label }) => (
          <button
            key={preset}
            type="button"
            className={`${btn} pointer-events-auto`}
            onClick={() => requestCamera(preset)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={roofHidden}
          className={`${btn} pointer-events-auto`}
          onClick={() => setMode(roofHidden ? 'zewnatrz' : 'bez-dachu')}
        >
          {roofHidden ? pl.pages.model.showRoof : pl.pages.model.hideRoof}
        </button>
      </div>
      {!selected && (
        <p className="pointer-events-none absolute bottom-3 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full bg-white/85 px-4 py-2 text-center text-sm text-stone-700 shadow">
          {pl.pages.model.hint}
        </p>
      )}

      <Sheet open={selected !== null} title={selected ? labelFor(selected) : ''} onClose={clear}>
        {selected && (
          <div data-testid="element-panel" data-element-key={selected}>
            <p className="mb-3 text-sm text-stone-500">{breadcrumbFor(selected).join(' › ')}</p>
            <p className="mb-4 text-stone-700">{pl.pages.model.pinsSoon}</p>
            <p className="text-xs text-stone-400">
              {pl.pages.model.elementKey}: <code>{selected}</code>
            </p>
          </div>
        )}
      </Sheet>
    </div>
  );
}
