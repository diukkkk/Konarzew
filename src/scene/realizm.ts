import { CanvasTexture, type Material, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from 'three';
import { defaultHouseSpec } from '../model3d';
import type { MaterialId } from '../model3d/types';

/**
 * PROTOTYP „realizm”: styl A + proceduralne faktury materiałów (rysowane w kodzie, bez zdjęć),
 * nakładane w skali metrycznej (1 m faktury = 1 m ściany), więc bloczek ma prawdziwy rozmiar.
 */
export const wariant: 'stan' | 'wizja' =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('wariant') === 'wizja'
    ? 'wizja'
    : 'stan';

let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function canvas(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void): CanvasTexture {
  const el = document.createElement('canvas');
  el.width = w;
  el.height = h;
  draw(el.getContext('2d')!);
  const t = new CanvasTexture(el);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function speckle(
  c: CanvasRenderingContext2D,
  w: number,
  h: number,
  n: number,
  lo: number,
  hi: number,
  a: number,
) {
  for (let i = 0; i < n; i++) {
    const v = Math.round(lo + rnd() * (hi - lo));
    c.fillStyle = `rgba(${v},${v},${v},${a})`;
    c.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2);
  }
}

/** Bloczek gazobetonowy 60 × 24 cm, fugi cienkie, mijankowo. Kafel 1,2 × 0,48 m. */
function blok() {
  return canvas(512, 205, (c) => {
    c.fillStyle = '#f1efe9';
    c.fillRect(0, 0, 512, 205);
    speckle(c, 512, 205, 5000, 200, 255, 0.35);
    c.strokeStyle = 'rgba(120,115,105,0.55)';
    c.lineWidth = 2;
    const rowH = 205 / 2;
    for (let r = 0; r < 2; r++) {
      const y = r * rowH;
      c.beginPath();
      c.moveTo(0, y + 1);
      c.lineTo(512, y + 1);
      c.stroke();
      const off = r % 2 ? 128 : 0;
      for (let x = off; x <= 512; x += 256) {
        c.beginPath();
        c.moveTo(x + 1, y);
        c.lineTo(x + 1, y + rowH);
        c.stroke();
      }
    }
  });
}

/** Cegła klinkierowa 25 × 6,5 cm, czerwono-brązowa z odcieniami. Kafel 1,0 × 0,6 m. */
function cegla() {
  return canvas(512, 307, (c) => {
    c.fillStyle = '#9c9488';
    c.fillRect(0, 0, 512, 307);
    const bw = 128,
      bh = 307 / 8;
    for (let r = 0; r < 8; r++)
      for (let i = -1; i < 5; i++) {
        const x = i * bw + (r % 2 ? bw / 2 : 0);
        const t = rnd();
        const R = 120 + t * 50,
          G = 52 + t * 22,
          B = 38 + t * 14;
        c.fillStyle = `rgb(${R | 0},${G | 0},${B | 0})`;
        c.fillRect(x + 3, r * bh + 3, bw - 6, bh - 6);
      }
    speckle(c, 512, 307, 6000, 30, 120, 0.25);
  });
}

/** Deska palona (shou sugi ban): pionowe deski 15 cm, prawie czarne, ze słojami. Kafel 1,2 × 2,4 m. */
function deskaPalona() {
  return canvas(256, 512, (c) => {
    c.fillStyle = '#1d1b1a';
    c.fillRect(0, 0, 256, 512);
    const n = 8;
    for (let i = 0; i < n; i++) {
      const x = (i * 256) / n;
      for (let k = 0; k < 40; k++) {
        const v = 25 + rnd() * 30;
        c.strokeStyle = `rgba(${v + 8},${v},${v - 4},0.6)`;
        c.lineWidth = 1;
        c.beginPath();
        const gx = x + 2 + rnd() * (256 / n - 4);
        c.moveTo(gx, 0);
        c.bezierCurveTo(gx + rnd() * 4 - 2, 170, gx + rnd() * 4 - 2, 340, gx, 512);
        c.stroke();
      }
      c.fillStyle = 'rgba(0,0,0,0.85)';
      c.fillRect(x, 0, 2, 512);
    }
  });
}

/** Blacha na rąbek: rąbki co 50 cm (jasny grzbiet + cień). Kafel 1,0 × 1,0 m. */
function blacha() {
  return canvas(256, 256, (c) => {
    c.fillStyle = '#3b4048';
    c.fillRect(0, 0, 256, 256);
    speckle(c, 256, 256, 800, 50, 80, 0.2);
    for (const x of [0, 128]) {
      c.fillStyle = 'rgba(150,160,175,0.7)';
      c.fillRect(x, 0, 3, 256);
      c.fillStyle = 'rgba(10,12,15,0.55)';
      c.fillRect(x + 3, 0, 6, 256);
    }
  });
}

/** Trawa na piasku: plamy zieleni, kępki źdźbeł, prześwity piasku. Kafel 6 × 6 m. */
function trawa(base: string, sand: number) {
  return canvas(512, 512, (c) => {
    c.fillStyle = base;
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 160 * sand; i++) {
      const x = rnd() * 512,
        y = rnd() * 512,
        r = 8 + rnd() * 30;
      c.fillStyle = `rgba(${190 + rnd() * 30},${170 + rnd() * 20},${120 + rnd() * 20},0.35)`;
      for (const dx of [-512, 0, 512])
        for (const dy of [-512, 0, 512]) {
          c.beginPath();
          c.ellipse(x + dx, y + dy, r, r * 0.6, rnd() * 3, 0, 7);
          c.fill();
        }
    }
    for (let i = 0; i < 9000; i++) {
      const x = rnd() * 512,
        y = rnd() * 512;
      const g = 90 + rnd() * 90;
      c.strokeStyle = `rgba(${g * 0.55},${g},${g * 0.35},0.55)`;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + rnd() * 3 - 1.5, y - 3 - rnd() * 4);
      c.stroke();
    }
  });
}

/** Piasek/żwir podjazdu. Kafel 3 × 3 m. */
function piasek() {
  return canvas(256, 256, (c) => {
    c.fillStyle = '#cbbd9e';
    c.fillRect(0, 0, 256, 256);
    speckle(c, 256, 256, 9000, 120, 240, 0.45);
  });
}

function papa() {
  return canvas(256, 256, (c) => {
    c.fillStyle = '#5a5d62';
    c.fillRect(0, 0, 256, 256);
    speckle(c, 256, 256, 7000, 40, 140, 0.35);
  });
}

function beton() {
  return canvas(256, 256, (c) => {
    c.fillStyle = '#b5b2aa';
    c.fillRect(0, 0, 256, 256);
    speckle(c, 256, 256, 5000, 120, 220, 0.3);
    for (let i = 0; i < 25; i++) {
      c.fillStyle = 'rgba(80,80,80,0.25)';
      c.beginPath();
      c.arc(rnd() * 256, rnd() * 256, 1 + rnd() * 2, 0, 7);
      c.fill();
    }
  });
}

type Tex = { make: () => CanvasTexture; meters: [number, number]; frame: 'dom' | 'swiat' };

function texFor(id: MaterialId): Tex | null {
  const vision = wariant === 'wizja';
  switch (id) {
    case 'sciana':
      return vision
        ? { make: cegla, meters: [1, 0.6], frame: 'dom' }
        : { make: blok, meters: [1.2, 0.48], frame: 'dom' };
    case 'sciana-garaz':
      return vision
        ? { make: deskaPalona, meters: [1.2, 2.4], frame: 'dom' }
        : { make: blok, meters: [1.2, 0.48], frame: 'dom' };
    case 'dach':
      return { make: blacha, meters: [1, 1], frame: 'dom' };
    case 'papa':
      return { make: papa, meters: [2, 2], frame: 'dom' };
    case 'beton':
    case 'wieniec':
    case 'cokol':
      return { make: beton, meters: [2, 2], frame: 'dom' };
    case 'okolica':
      return { make: () => trawa('#6c8f3e', 0.6), meters: [6, 6], frame: 'swiat' };
    case 'dzialka':
      return { make: () => trawa('#86a24e', 1.4), meters: [6, 6], frame: 'swiat' };
    case 'podjazd':
    case 'oczyszczalnia':
      return { make: piasek, meters: [3, 3], frame: 'swiat' };
    default:
      return null;
  }
}

const rot = ((defaultHouseSpec.plot?.housePosition?.rotationDeg ?? 0) * Math.PI) / 180;

/**
 * Faktura nakładana „z trzech stron” we współrzędnych domu/świata (nie zależy od UV bryły),
 * więc fugi bloczków i rąbki blachy mają prawdziwe wymiary i układają się poziomo.
 */
function metricMap(m: MeshStandardMaterial, meters: [number, number], frame: 'dom' | 'swiat', roof: boolean) {
  m.customProgramCacheKey = () => `metric-${meters.join('x')}-${frame}-${roof}`;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTile = { value: meters };
    sh.uniforms.uRot = { value: frame === 'dom' ? rot : 0 };
    sh.vertexShader = sh.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vMPos;\nvarying vec3 vMNrm;\nuniform float uRot;',
      )
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
        vec4 wp4 = modelMatrix * vec4(transformed, 1.0);
        vec3 wn = normalize(mat3(modelMatrix) * objectNormal);
        float c = cos(uRot), s = sin(uRot);
        vMPos = vec3(wp4.x * c - wp4.z * s, wp4.y, wp4.x * s + wp4.z * c);
        vMNrm = vec3(wn.x * c - wn.z * s, wn.y, wn.x * s + wn.z * c);`,
      );
    sh.fragmentShader = sh.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vMPos;\nvarying vec3 vMNrm;\nuniform vec2 uTile;',
      )
      .replace(
        '#include <map_fragment>',
        `vec3 an = abs(normalize(vMNrm));
        vec2 muv;
        ${
          roof
            ? // dach: rąbki biegną w dół połaci (wzdłuż osi z domu), więc u = x
              'muv = vec2(vMPos.x, vMPos.z);'
            : `if (an.y > 0.7) muv = vMPos.xz; else if (an.x > an.z) muv = vec2(vMPos.z, vMPos.y); else muv = vec2(vMPos.x, vMPos.y);`
        }
        vec4 texelColor = texture2D(map, muv / uTile);
        diffuseColor *= texelColor;`,
      );
  };
}

const cache = new Map<string, Material>();

/** Materiał z fakturą albo null (wtedy zostaje zwykły kolor stylu A). */
export function realMaterial(id: MaterialId, color: string, state: string): Material | null {
  const t = texFor(id);
  if (!t) return null;
  const k = `${id}:${state}`;
  let m = cache.get(k) as MeshStandardMaterial | undefined;
  if (m) return m;
  m = new MeshStandardMaterial({
    color: state === 'selected' ? color : '#ffffff',
    roughness: 0.9,
    metalness: 0,
  });
  if (id === 'dach') {
    m.roughness = 0.45;
    m.metalness = 0.35;
  }
  m.map = t.make();
  metricMap(m, t.meters, t.frame, id === 'dach');
  if (state === 'hover') m.emissive.set('#ffffff').multiplyScalar(0.15);
  cache.set(k, m);
  return m;
}
