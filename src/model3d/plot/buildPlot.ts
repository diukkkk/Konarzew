import type { PlotSpec, Tree } from '../../core/types';
import type { BuiltElement, Pt2 } from '../types';

/** Płaski wielokąt na ziemi (układ działki: x na wschód, z na południe). */
function groundPolygon(
  key: string,
  points: Pt2[],
  y: number,
  thickness: number,
  material: BuiltElement['material'],
  category: BuiltElement['category'],
): BuiltElement {
  // Kształt w lokalnym XY = (x, -z), obrót -90° wokół X → wyciągnięcie w górę.
  return {
    elementKey: key,
    category,
    primitive: { kind: 'extrude', outline: points.map(([x, z]) => [x, -z] as Pt2), depth: thickness },
    position: [0, y, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material,
  };
}

function treeParts(key: string, tr: Tree, groundY: number, clickable: boolean): BuiltElement[] {
  const isPine = tr.kind === 'sosna';
  const trunkH = tr.height * (isPine ? 0.6 : 0.5);
  const crownH = tr.height - trunkH * 0.85;
  const r = tr.crown / 2;
  const base = {
    elementKey: key,
    category: (clickable ? 'drzewo' : 'las') as BuiltElement['category'],
    clickable,
    noOutline: !clickable,
  };
  return [
    {
      ...base,
      primitive: { kind: 'cylinder', radiusTop: 0.12, radiusBottom: 0.22, height: trunkH, segments: 6 },
      position: [tr.x, groundY + trunkH / 2, tr.z],
      rotation: [0, 0, 0],
      material: isPine ? 'pien-sosna' : 'pien-brzoza',
    },
    isPine
      ? {
          ...base,
          primitive: { kind: 'cone', radius: r, height: crownH, segments: 7 },
          position: [tr.x, groundY + trunkH * 0.85 + crownH / 2, tr.z],
          rotation: [0, 0, 0],
          material: 'korona-sosna',
        }
      : {
          ...base,
          primitive: { kind: 'sphere', radius: r, detail: 0 },
          position: [tr.x, groundY + trunkH * 0.85 + crownH / 2, tr.z],
          rotation: [0, 0, 0],
          scale: [1, crownH / (2 * r), 1],
          material: 'korona-brzoza',
        },
  ];
}

/** Deterministyczny generator liczb losowych (ten sam las przy każdym uruchomieniu). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pointInPolygon([x, z]: Pt2, poly: Pt2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i]!;
    const [xj, zj] = poly[j]!;
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

function signedArea(poly: Pt2[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, z1] = poly[i]!;
    const [x2, z2] = poly[(i + 1) % poly.length]!;
    s += x1 * z2 - x2 * z1;
  }
  return s / 2;
}

export function polygonArea(poly: Pt2[]): number {
  return Math.abs(signedArea(poly));
}

/** Drzewa lasu dookoła działki (dekoracja, nieklikalna). */
export function forestTrees(plot: PlotSpec): Tree[] {
  const f = plot.surroundingForest;
  if (!f || f.depth <= 0) return [];
  const poly = plot.boundary;
  const rand = mulberry32(f.seed);
  const ccw = signedArea(poly) > 0; // w układzie x/z
  const trees: Tree[] = [];
  poly.forEach((a, i) => {
    if (f.skipEdges.includes(i)) return;
    const b = poly[(i + 1) % poly.length]!;
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    // normalna na zewnątrz działki
    const nx = (ccw ? dz : -dz) / len;
    const nz = (ccw ? -dx : dx) / len;
    const count = Math.round(len * f.depth * f.density);
    for (let k = 0; k < count; k++) {
      const s = rand();
      const d = 3 + rand() * (f.depth - 3);
      const x = a[0] + dx * s + nx * d;
      const z = a[1] + dz * s + nz * d;
      const pine = rand() < 0.55;
      const h = pine ? 14 + rand() * 8 : 10 + rand() * 7;
      if (pointInPolygon([x, z], poly)) continue;
      trees.push({
        key: `las-${i}-${k}`,
        x,
        z,
        crown: pine ? 3 + rand() * 1.5 : 3.5 + rand() * 2,
        height: h,
        kind: pine ? 'sosna' : 'brzoza',
      });
    }
  });
  return trees;
}

/**
 * Działka: okolica, teren działki, granica (niski płotek), strefy, drzewa, las.
 * groundY = poziom terenu względem ±0 domu.
 */
export function buildPlot(plot: PlotSpec, groundY: number): BuiltElement[] {
  const out: BuiltElement[] = [];
  const b = plot.boundary;
  const xs = b.map((p) => p[0]);
  const zs = b.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cz = (Math.min(...zs) + Math.max(...zs)) / 2;

  out.push({
    elementKey: 'dzialka.okolica',
    category: 'teren',
    primitive: { kind: 'box', size: [500, 0.2, 500] },
    position: [cx, groundY - 0.15, cz],
    rotation: [0, 0, 0],
    material: 'okolica',
    clickable: false,
    noOutline: true,
  });
  out.push(groundPolygon('dzialka.teren', b, groundY - 0.05, 0.05, 'dzialka', 'teren'));

  // granica: niski płotek wzdłuż boków
  b.forEach((a, i) => {
    const c = b[(i + 1) % b.length]!;
    const dx = c[0] - a[0];
    const dz = c[1] - a[1];
    const len = Math.hypot(dx, dz);
    out.push({
      elementKey: 'dzialka.granica',
      category: 'granica',
      primitive: { kind: 'box', size: [len, 0.6, 0.12] },
      position: [(a[0] + c[0]) / 2, groundY + 0.3, (a[1] + c[1]) / 2],
      rotation: [0, -Math.atan2(dz, dx), 0],
      material: 'granica',
    });
  });

  for (const zone of plot.zones) {
    const material =
      zone.kind === 'podjazd' ? 'podjazd' : zone.kind === 'oczyszczalnia' ? 'oczyszczalnia' : 'dzialka';
    out.push(groundPolygon(`dzialka.strefa.${zone.key}`, zone.polygon, groundY, 0.06, material, 'strefa'));
  }

  for (const tr of plot.trees) out.push(...treeParts(`dzialka.drzewo.${tr.key}`, tr, groundY, true));
  for (const tr of forestTrees(plot)) out.push(...treeParts('dzialka.las', tr, groundY, false));

  return out;
}
