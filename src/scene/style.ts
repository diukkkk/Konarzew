import {
  CanvasTexture,
  DataTexture,
  type Material,
  MeshLambertMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  RedFormat,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three';
import type { MaterialId, Primitive } from '../model3d/types';
import { accent, palette } from './palette';
import { realMaterial } from './realizm';

/**
 * PROTOTYP (gałąź do wyboru stylu): kilka wariantów wyglądu tej samej sceny.
 * Wybór przez adres: ?styl=obecny | strategia | lowpoly | komiks | makieta
 */
export type StyleId = 'obecny' | 'strategia' | 'lowpoly' | 'komiks' | 'makieta' | 'realizm';
const ids: StyleId[] = ['obecny', 'strategia', 'lowpoly', 'komiks', 'makieta', 'realizm'];

function readStyle(): StyleId {
  if (typeof window === 'undefined') return 'obecny';
  const s = new URLSearchParams(window.location.search).get('styl');
  return ids.includes(s as StyleId) ? (s as StyleId) : 'obecny';
}
export const styleId: StyleId = readStyle();

type Pal = Partial<Record<MaterialId, string>>;

/** Ciepłe, nasycone barwy jak w grach strategicznych (malowane ręcznie). */
const strategia: Pal = {
  sciana: '#f3e9d2',
  'sciana-garaz': '#eadcc0',
  dach: '#4b5262',
  obrobka: '#363b47',
  szklo: '#6f9fc4',
  cokol: '#7c6a55',
  beton: '#bdb3a0',
  papa: '#6a6a70',
  wieniec: '#a39a88',
  krokiew: '#c08a4c',
  okolica: '#6f983e',
  dzialka: '#86ab4c',
  granica: '#e9dcb8',
  podjazd: '#cdb58a',
  oczyszczalnia: '#c9a96b',
  'pien-sosna': '#7b4a2a',
  'pien-brzoza': '#f1ece0',
  'korona-brzoza': '#8dbb3a',
  'korona-sosna': '#2f6b3a',
};

/** Pastelowe, czyste kolory, ścianki jak cięte z papieru. */
const lowpoly: Pal = {
  sciana: '#f4f1ea',
  'sciana-garaz': '#ebe6dc',
  dach: '#4a5568',
  szklo: '#8ec5e8',
  okolica: '#a8d08d',
  dzialka: '#b9dc8f',
  podjazd: '#e2d6bf',
  oczyszczalnia: '#e8cf93',
  'korona-brzoza': '#b5d96a',
  'korona-sosna': '#4f9a6b',
  'pien-sosna': '#9b6a46',
  beton: '#c4c1ba',
};

/** Mocne, komiksowe kolory pod gruby kontur. */
const komiks: Pal = {
  sciana: '#fbf6ea',
  'sciana-garaz': '#f2ead8',
  dach: '#3d4a63',
  szklo: '#58b4e8',
  okolica: '#86c34a',
  dzialka: '#9fd356',
  podjazd: '#e6d2a3',
  oczyszczalnia: '#f0c868',
  'korona-brzoza': '#a6d43c',
  'korona-sosna': '#2e8a4e',
  'pien-sosna': '#8a4f2b',
  beton: '#c2c0bb',
  krokiew: '#d09048',
};

/** Makieta architektoniczna: jasne, stonowane, matowe (karton/glina). */
const makieta: Pal = {
  sciana: '#f5f2ec',
  'sciana-garaz': '#efebe3',
  dach: '#6b717c',
  obrobka: '#5d636d',
  szklo: '#9fb7c8',
  drzwi: '#6a6e75',
  brama: '#757a82',
  cokol: '#9a958c',
  beton: '#d6d2ca',
  papa: '#8d9096',
  wieniec: '#c9c5bd',
  krokiew: '#d8c3a2',
  okolica: '#dcd6c4',
  dzialka: '#e6e0cd',
  granica: '#ffffff',
  podjazd: '#cfc8b8',
  oczyszczalnia: '#d9ccab',
  'pien-sosna': '#c9b79c',
  'pien-brzoza': '#efebe3',
  'korona-brzoza': '#b9c7a0',
  'korona-sosna': '#94a88a',
};

const realizm: Pal = {
  ...strategia,
  sciana: '#f1efe9',
  'sciana-garaz': '#ece9e2',
  drzwi: '#2a2d31',
  brama: '#2f3237',
  szklo: '#5e8aa8',
};
const palettes: Record<StyleId, Pal> = { obecny: {}, strategia, lowpoly, komiks, makieta, realizm };

export function colorFor(id: MaterialId): string {
  return palettes[styleId][id] ?? palette[id];
}

/** Odcienie koron: każde drzewo trochę inne (w stylach innych niż obecny). */
const crownShades = [0.86, 1, 1.12];
export function variantFor(id: MaterialId, elementKey: string): number {
  if (styleId === 'obecny') return 1;
  if (id !== 'korona-brzoza' && id !== 'korona-sosna') return 1;
  let h = 0;
  for (let i = 0; i < elementKey.length; i++) h = (h * 31 + elementKey.charCodeAt(i)) | 0;
  return crownShades[Math.abs(h) % crownShades.length]!;
}

function gradient(steps: number[]): DataTexture {
  const g = new DataTexture(new Uint8Array(steps), steps.length, 1, RedFormat);
  g.minFilter = NearestFilter;
  g.magFilter = NearestFilter;
  g.generateMipmaps = false;
  g.needsUpdate = true;
  return g;
}
let toon4: DataTexture | null = null;
let toon2: DataTexture | null = null;

/** Plamista, „malowana” faktura trawy/piasku (szarości mnożone przez kolor materiału). */
function paintedTexture(repeat: number): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#e6e6e6';
  ctx.fillRect(0, 0, 256, 256);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 256;
    const y = rnd() * 256;
    const r = 6 + rnd() * 28;
    const v = Math.round(200 + rnd() * 55);
    ctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
    for (const dx of [-256, 0, 256])
      for (const dy of [-256, 0, 256]) {
        ctx.beginPath();
        ctx.ellipse(x + dx, y + dy, r, r * 0.7, rnd() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
  }
  for (let i = 0; i < 1800; i++) {
    const v = Math.round(170 + rnd() * 85);
    ctx.fillStyle = `rgba(${v},${v},${v},0.5)`;
    ctx.fillRect(rnd() * 256, rnd() * 256, 1.5, 3);
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export type MaterialState = 'normal' | 'hover' | 'selected';
const cache = new Map<string, Material>();

export function materialFor(id: MaterialId, state: MaterialState, shade = 1): Material {
  const k = `${id}:${state}:${shade}`;
  let m = cache.get(k) as
    (Material & { color: import('three').Color; emissive?: import('three').Color }) | undefined;
  if (m) return m;
  const color = state === 'selected' ? accent : colorFor(id);
  switch (styleId) {
    case 'realizm': {
      const r = realMaterial(id, color, state);
      if (r) {
        cache.set(k, r);
        return r;
      }
      m = new MeshStandardMaterial({ color, roughness: 0.85, metalness: 0 });
      break;
    }
    case 'strategia': {
      const mm = new MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 });
      if (id === 'okolica') mm.map = paintedTexture(45);
      if (id === 'dzialka' || id === 'podjazd' || id === 'oczyszczalnia') mm.map = paintedTexture(1 / 9);
      if (id === 'dach') mm.roughness = 0.55;
      m = mm;
      break;
    }
    case 'lowpoly':
      m = new MeshLambertMaterial({ color, flatShading: true });
      break;
    case 'komiks':
      m = new MeshToonMaterial({ color, gradientMap: (toon2 ??= gradient([110, 255])) });
      break;
    case 'makieta':
      m = new MeshStandardMaterial({ color, roughness: 1, metalness: 0 });
      break;
    default:
      m = new MeshToonMaterial({ color, gradientMap: (toon4 ??= gradient([150, 190, 228, 255])) });
  }
  if (shade !== 1) m.color.multiplyScalar(shade);
  if (state === 'hover' && m.emissive) m.emissive.set('#ffffff').multiplyScalar(0.18);
  if (id === 'szklo') {
    m.transparent = state === 'normal';
    m.opacity = styleId === 'makieta' ? 0.7 : 0.85;
  }
  cache.set(k, m);
  return m;
}

/** Drzewa w niektórych stylach mają gładsze, bardziej „bajkowe” korony. */
export function primitiveFor(p: Primitive, id: MaterialId): Primitive {
  if (styleId === 'strategia' || styleId === 'komiks' || styleId === 'makieta' || styleId === 'realizm') {
    if (p.kind === 'sphere' && id === 'korona-brzoza') return { ...p, detail: 2 };
    if (p.kind === 'cone' && id === 'korona-sosna') return { ...p, segments: 12 };
    if (p.kind === 'cylinder' && id.startsWith('pien')) return { ...p, segments: 8 };
  }
  return p;
}

/** Czy pokazywać cienkie krawędzie (styl obecny) lub gruby kontur (komiks). */
export const edgeMode: 'cienkie' | 'gruby' | 'brak' =
  styleId === 'obecny' ? 'cienkie' : styleId === 'komiks' ? 'gruby' : 'brak';
