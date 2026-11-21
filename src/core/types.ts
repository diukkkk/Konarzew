// KONTRAKTY — opis w docs/plan/03-model-danych.md. Zmiany tylko z wpisem w docs/plan/DECYZJE.md.
// Ten plik zawiera na razie część „Model domu” (HouseSpec, PlotSpec). Rekordy bazy (Pin, Entry…) dopisze T02.

export type UUID = string;

/** Strona/ściana domu. Nazwy wg stron świata domu na działce (dom obrócony o ok. 28°):
 *  pn = strona ogrodowa (NNW), pd = front z wejściem (SSE), zach = szczyt salonu (WSW), wsch = szczyt garażu (ENE). */
export type WallId =
  'pn' | 'pd' | 'zach' | 'wsch' | 'szczyt-zach' | 'szczyt-wsch' | 'garaz-pd' | 'garaz-wsch' | 'garaz-zach';

export interface Opening {
  key: string; // stabilny, np. 'o-salon-1' → elementKey 'dom.okno.o-salon-1'
  kind: 'okno' | 'drzwi' | 'brama';
  wall: WallId;
  /** Odległość od początku ściany (m), mierzona wzdłuż osi x (ściany pn/pd) lub z (ściany zach/wsch) układu domu. */
  offset: number;
  width: number;
  height: number;
  /** Wysokość parapetu nad ±0 (m). */
  sill: number;
}

/** Część z płaskim dachem (garaż, zadaszenie wejścia). Współrzędne w układzie domu. */
export interface FlatPart {
  key: string;
  kind: 'garaz' | 'zadaszenie';
  x: number;
  z: number;
  w: number; // wzdłuż x
  d: number; // wzdłuż z
  height: number; // góra attyki
  enclosed: boolean; // true = ściany dookoła, false = tylko dach na słupach
}

export interface Terrace {
  key: string;
  x: number;
  z: number;
  w: number;
  d: number;
  covered: boolean;
}

export interface Chimney {
  key: string;
  x: number;
  z: number;
  w: number;
  d: number;
}

/** Pergola / rama ze słupów i belek (np. betonowa rama przy szczycie salonu). */
export interface Pergola {
  key: string;
  posts: [number, number][]; // [x, z] w układzie domu
  height: number;
  postSize: number;
}

export interface Room {
  key: string;
  name: string;
  floor: number;
  polygon: [number, number][];
  height?: number;
}

/**
 * Specyfikacja domu (metry, stopnie).
 * Układ domu: x wzdłuż kalenicy od szczytu salonu (0) do szczytu garażu (length),
 * z od strony ogrodowej (0) do frontu (width), y w górę, ±0,00 = posadzka parteru.
 */
export interface HouseSpec {
  schemaVersion: 1;
  name: string;
  footprint: { length: number; width: number };
  wallThickness: number;
  /** Wysokość ścian bryły głównej (do murłaty). */
  wallHeight: number;
  /** Poziom terenu przy domu względem ±0 (ujemny). */
  groundLevel: number;
  /** Bryła główna pod dachem dwuspadowym: z od 0 do depth. */
  mainBlock: { depth: number };
  roof: {
    type: 'dwuspadowy';
    pitchDeg: number;
    overhangEaves: number;
    overhangGable: number;
    material: 'blacha-rabek' | 'dachowka' | 'inny';
  };
  flatParts: FlatPart[];
  openings: Opening[];
  /** Przeszklenie w szczycie (trójkąt/trapez) — klucz okna i strona. */
  gableGlazing: { key: string; wall: 'szczyt-zach' | 'szczyt-wsch' }[];
  terraces: Terrace[];
  chimneys: Chimney[];
  pergolas: Pergola[];
  rooms: Room[];
  plot?: PlotSpec;
  /** Źródła wymiarów, założenia, zmiany względem projektu — nie używać w logice. */
  extras?: Record<string, unknown>;
}

export interface Tree {
  key: string;
  x: number;
  z: number;
  crown: number; // średnica korony
  height: number;
  kind?: 'brzoza' | 'sosna' | 'inne';
}

export interface Zone {
  key: string;
  name: string;
  polygon: [number, number][];
  kind: 'podjazd' | 'ogrod' | 'trawnik' | 'oczyszczalnia' | 'przylacze' | 'inne';
}

/**
 * Działka. Układ działki: początek w narożniku A (zachodni), x na wschód, z na południe (metry).
 */
export interface PlotSpec {
  boundary: [number, number][];
  /** Narożnik domu (x=0, z=0 układu domu) w układzie działki + obrót (stopnie, przeciwnie do zegara patrząc z góry). */
  housePosition: { x: number; z: number; rotationDeg: number };
  mapMediaId: UUID | null;
  mapCalibration: { p1: [number, number]; p2: [number, number]; meters: number } | null;
  trees: Tree[];
  zones: Zone[];
  /** Las dookoła działki (dekoracja): szerokość pasa w metrach, 0 = brak. */
  surroundingForest?: { depth: number; density: number; seed: number; skipEdges: number[] };
}
