// Wynik generatora 3D: czyste dane (bez three.js i Reacta), testowalne.

export type Vec3 = [number, number, number];
export type Pt2 = [number, number];

export type Primitive =
  | { kind: 'box'; size: Vec3 }
  /** Kształt w płaszczyźnie lokalnej XY (z otworami), wyciągnięty wzdłuż lokalnego +Z o `depth`. */
  | { kind: 'extrude'; outline: Pt2[]; holes?: Pt2[][]; depth: number }
  | { kind: 'cylinder'; radiusTop: number; radiusBottom: number; height: number; segments: number }
  | { kind: 'cone'; radius: number; height: number; segments: number }
  | { kind: 'sphere'; radius: number; detail: number };

export type ElementCategory =
  | 'sciana'
  | 'dach'
  | 'okap'
  | 'konstrukcja'
  | 'otwor'
  | 'taras'
  | 'komin'
  | 'fundament'
  | 'zadaszenie'
  | 'teren'
  | 'granica'
  | 'strefa'
  | 'drzewo'
  | 'las';

export type MaterialId =
  | 'sciana'
  | 'sciana-garaz'
  | 'dach'
  | 'obrobka'
  | 'szklo'
  | 'drzwi'
  | 'brama'
  | 'beton'
  | 'cokol'
  | 'taras'
  | 'murlata'
  | 'okolica'
  | 'dzialka'
  | 'granica'
  | 'podjazd'
  | 'oczyszczalnia'
  | 'pien-brzoza'
  | 'pien-sosna'
  | 'korona-brzoza'
  | 'korona-sosna';

/**
 * Jeden kawałek geometrii. Element (elementKey) może składać się z kilku kawałków
 * o tym samym kluczu — kliknięcie dowolnego zaznacza cały element.
 */
export interface BuiltElement {
  elementKey: string;
  category: ElementCategory;
  primitive: Primitive;
  position: Vec3;
  rotation: Vec3;
  scale?: Vec3;
  material: MaterialId;
  /** Ukryty w zwykłym widoku (np. murłata pod dachem) — widoczny w trybie „bez dachu”. */
  hiddenByDefault?: boolean;
  /** false = dekoracja, nie reaguje na kliknięcia (np. las dookoła). */
  clickable?: boolean;
  /** Bez obrysu (dla wielu małych obiektów, np. drzew w lesie). */
  noOutline?: boolean;
}
