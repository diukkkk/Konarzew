import { create } from 'zustand';

export type Layer = 'woda' | 'prad' | 'kanalizacja' | 'co' | 'wentylacja' | 'smart' | 'kamery';
export type InteriorMode = 'zewnatrz' | 'bez-dachu' | 'pietro-0' | 'pietro-1';
export type CameraPreset = 'dom' | 'gora' | 'dzialka';

interface ViewState {
  activeVersionId: string | null;
  visibleLayers: Layer[];
  interiorMode: InteriorMode;
  /** Prośba o ustawienie kamery; `seq` rośnie przy każdym kliknięciu, żeby powtórzyć ten sam widok. */
  cameraRequest: { preset: CameraPreset; seq: number };
  setActiveVersion: (id: string | null) => void;
  toggleLayer: (layer: Layer) => void;
  setInteriorMode: (mode: InteriorMode) => void;
  requestCamera: (preset: CameraPreset) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  activeVersionId: null,
  visibleLayers: [],
  interiorMode: 'zewnatrz',
  cameraRequest: { preset: 'dom', seq: 0 },
  setActiveVersion: (id) => set({ activeVersionId: id }),
  toggleLayer: (layer) =>
    set((s) => ({
      visibleLayers: s.visibleLayers.includes(layer)
        ? s.visibleLayers.filter((l) => l !== layer)
        : [...s.visibleLayers, layer],
    })),
  setInteriorMode: (mode) => set({ interiorMode: mode }),
  requestCamera: (preset) => set((s) => ({ cameraRequest: { preset, seq: s.cameraRequest.seq + 1 } })),
}));
