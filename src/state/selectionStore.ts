import { create } from 'zustand';

type Point = [number, number, number];

interface SelectionState {
  selectedElementKey: string | null;
  selectedPoint: Point | null;
  selectedPinId: string | null;
  hoveredElementKey: string | null;
  select: (key: string, point?: Point | null) => void;
  selectPin: (pinId: string | null) => void;
  hover: (key: string | null) => void;
  clear: () => void;
}

/** Co jest zaznaczone w modelu 3D (kontrakt: docs/plan/02-architektura.md). */
export const useSelectionStore = create<SelectionState>((set) => ({
  selectedElementKey: null,
  selectedPoint: null,
  selectedPinId: null,
  hoveredElementKey: null,
  select: (key, point = null) => set({ selectedElementKey: key, selectedPoint: point, selectedPinId: null }),
  selectPin: (pinId) => set({ selectedPinId: pinId }),
  hover: (key) => set({ hoveredElementKey: key }),
  clear: () => set({ selectedElementKey: null, selectedPoint: null, selectedPinId: null }),
}));
