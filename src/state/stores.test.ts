import { useSelectionStore } from './selectionStore';
import { useViewStore } from './viewStore';

describe('selectionStore', () => {
  it('zaznacza i czyści element', () => {
    useSelectionStore.getState().select('dom.dach.polac-pd', [1, 2, 3]);
    expect(useSelectionStore.getState().selectedElementKey).toBe('dom.dach.polac-pd');
    expect(useSelectionStore.getState().selectedPoint).toEqual([1, 2, 3]);
    useSelectionStore.getState().clear();
    expect(useSelectionStore.getState().selectedElementKey).toBeNull();
  });
});

describe('viewStore', () => {
  it('przełącza warstwy, tryb i prośby o kamerę', () => {
    const s = useViewStore.getState();
    s.toggleLayer('prad');
    expect(useViewStore.getState().visibleLayers).toEqual(['prad']);
    useViewStore.getState().toggleLayer('prad');
    expect(useViewStore.getState().visibleLayers).toEqual([]);
    useViewStore.getState().setInteriorMode('bez-dachu');
    expect(useViewStore.getState().interiorMode).toBe('bez-dachu');
    const seq = useViewStore.getState().cameraRequest.seq;
    useViewStore.getState().requestCamera('gora');
    expect(useViewStore.getState().cameraRequest).toEqual({ preset: 'gora', seq: seq + 1 });
  });
});
