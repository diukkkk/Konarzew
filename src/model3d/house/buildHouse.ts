import type { HouseSpec, Opening, WallId } from '../../core/types';
import type { BuiltElement, Pt2 } from '../types';
import { buildInWall, buildWall, type WallDef } from './walls';

const DEG = Math.PI / 180;

export interface HouseGeometryInfo {
  /** Wysokość kalenicy (góra pokrycia) nad ±0. */
  ridgeTop: number;
  /** Środek bryły w układzie domu (do ustawienia kamery). */
  center: [number, number, number];
}

export function houseInfo(spec: HouseSpec): HouseGeometryInfo {
  const D = spec.mainBlock.depth;
  const ridge = spec.wallHeight + (D / 2) * Math.tan(spec.roof.pitchDeg * DEG);
  return { ridgeTop: ridge + 0.25, center: [spec.footprint.length / 2, ridge / 2, spec.footprint.width / 2] };
}

/**
 * Generuje bryłę domu z HouseSpec. Kolejność i zestaw kluczy zależą tylko od struktury spec (kluczy okien,
 * części, tarasów…), nie od wymiarów — zmiana liczby nie gubi pinezek.
 */
export function buildHouse(spec: HouseSpec): BuiltElement[] {
  const L = spec.footprint.length;
  const D = spec.mainBlock.depth;
  const t = spec.wallThickness;
  const H = spec.wallHeight;
  const g = spec.groundLevel;
  const p = spec.roof.pitchDeg * DEG;
  const tanP = Math.tan(p);
  const ridgeY = H + (D / 2) * tanP;
  const hasFrontFlat = spec.flatParts.some((f) => Math.abs(f.z - D) < 0.01);

  const out: BuiltElement[] = [];
  const openingsOn = (wall: WallId): Opening[] => spec.openings.filter((o) => o.wall === wall);

  // ---------- Fundament / cokół ----------
  out.push({
    elementKey: 'dom.fundament',
    category: 'fundament',
    primitive: { kind: 'box', size: [L + 0.04, -g, D + 0.04] },
    position: [L / 2, g / 2, D / 2],
    rotation: [0, 0, 0],
    material: 'cokol',
  });

  // ---------- Ściany bryły głównej ----------
  const mainWalls: WallDef[] = [
    {
      key: 'dom.sciana.pn',
      axis: 'x',
      s0: 0,
      s1: L,
      outer: 0,
      inward: 1,
      thickness: t,
      height: H,
      baseY: 0,
      material: 'sciana',
    },
    {
      key: 'dom.sciana.pd',
      axis: 'x',
      s0: 0,
      s1: L,
      outer: D,
      inward: -1,
      thickness: t,
      height: H,
      baseY: 0,
      material: 'sciana',
    },
    {
      key: 'dom.sciana.zach',
      axis: 'z',
      s0: t,
      s1: D - t,
      outer: 0,
      inward: 1,
      thickness: t,
      height: H,
      baseY: 0,
      material: 'sciana',
    },
    {
      key: 'dom.sciana.wsch',
      axis: 'z',
      s0: t,
      s1: D - t,
      outer: L,
      inward: -1,
      thickness: t,
      height: H,
      baseY: 0,
      material: 'sciana',
    },
  ];
  const wallIdOf: Record<string, WallId> = {
    'dom.sciana.pn': 'pn',
    'dom.sciana.pd': 'pd',
    'dom.sciana.zach': 'zach',
    'dom.sciana.wsch': 'wsch',
  };
  for (const w of mainWalls) out.push(...buildWall(w, openingsOn(wallIdOf[w.key]!)));

  // ---------- Szczyty (trójkąty nad ścianami szczytowymi) ----------
  const gableOutline: Pt2[] = [
    [0, 0],
    [D, 0],
    [D / 2, ridgeY - H],
  ];
  for (const side of ['zach', 'wsch'] as const) {
    const wall: WallDef = {
      key: `dom.sciana.szczyt-${side}`,
      axis: 'z',
      s0: 0,
      s1: D,
      outer: side === 'zach' ? 0 : L,
      inward: side === 'zach' ? 1 : -1,
      thickness: t,
      outline: gableOutline,
      height: ridgeY - H,
      baseY: H,
      material: 'sciana',
    };
    const glazing = spec.gableGlazing.filter((gg) => gg.wall === `szczyt-${side}`);
    const holes: Pt2[][] = [];
    const glassShapes: { key: string; shape: Pt2[] }[] = [];
    for (const gg of glazing) {
      const half = Math.min(2.6, D / 2 - 0.6);
      const base = 0.25;
      const shape: Pt2[] = [
        [D / 2 - half, base],
        [D / 2 + half, base],
        [D / 2, base + half * tanP * 0.85],
      ];
      holes.push(shape);
      glassShapes.push({ key: `dom.okno.${gg.key}`, shape });
    }
    out.push(...buildWall(wall, [], holes));
    for (const gs of glassShapes) out.push(buildInWall(wall, gs.key, gs.shape, 'szklo', 'otwor'));
  }

  // ---------- Murłata (widoczna w trybie bez dachu) ----------
  for (const z of [t / 2, D - t / 2]) {
    out.push({
      elementKey: 'dom.dach.murlata',
      category: 'konstrukcja',
      primitive: { kind: 'box', size: [L, 0.14, 0.16] },
      position: [L / 2, H + 0.07, z],
      rotation: [0, 0, 0],
      material: 'murlata',
      hiddenByDefault: true,
    });
  }

  // ---------- Dach dwuspadowy ----------
  const rt = 0.2; // grubość połaci
  const og = spec.roof.overhangGable;
  const roofLen = L + 2 * og;
  const sides = [
    { key: 'pn', o: spec.roof.overhangEaves, sign: -1 },
    { key: 'pd', o: hasFrontFlat ? 0 : spec.roof.overhangEaves, sign: 1 },
  ] as const;
  for (const s of sides) {
    const S = (D / 2 + s.o) / Math.cos(p);
    const eaveZ = s.sign === -1 ? -s.o : D + s.o;
    const eaveY = H - s.o * tanP;
    const zc = (D / 2 + eaveZ) / 2;
    const yc = (ridgeY + eaveY) / 2;
    // przesunięcie o pół grubości w stronę zewnętrzną (normalna połaci)
    const nz = s.sign * Math.sin(p);
    const ny = Math.cos(p);
    const rotX = s.sign === -1 ? -p : p;
    out.push({
      elementKey: `dom.dach.polac-${s.key}`,
      category: 'dach',
      primitive: { kind: 'box', size: [roofLen, rt, S] },
      position: [L / 2, yc + (ny * rt) / 2, zc + (nz * rt) / 2],
      rotation: [rotX, 0, 0],
      material: 'dach',
    });
    // obróbki blacharskie na krawędziach szczytowych
    for (const x of [-og - 0.03, L + og + 0.03]) {
      out.push({
        elementKey: 'dom.dach.obrobki',
        category: 'dach',
        primitive: { kind: 'box', size: [0.06, rt + 0.1, S + 0.04] },
        position: [x, yc + (ny * rt) / 2, zc + (nz * rt) / 2],
        rotation: [rotX, 0, 0],
        material: 'obrobka',
      });
    }
    // rynna / okap
    out.push({
      elementKey: `dom.dach.okap-${s.key}`,
      category: 'okap',
      primitive: { kind: 'box', size: [roofLen, 0.14, 0.14] },
      position: [L / 2, eaveY - 0.02, eaveZ + s.sign * 0.07],
      rotation: [0, 0, 0],
      material: 'obrobka',
    });
    // skrzynia okapowa (podbitka) — tylko gdy jest wysięg
    if (s.o > 0.05) {
      out.push({
        elementKey: `dom.dach.skrzynia-okapowa-${s.key}`,
        category: 'okap',
        primitive: { kind: 'box', size: [L, 0.22, s.o] },
        position: [L / 2, eaveY - 0.11, s.sign * (s.o / 2) + (s.sign === 1 ? D : 0)],
        rotation: [0, 0, 0],
        material: 'obrobka',
      });
    }
  }
  out.push({
    elementKey: 'dom.dach.kalenica',
    category: 'dach',
    primitive: { kind: 'box', size: [roofLen, 0.1, 0.4] },
    position: [L / 2, ridgeY + rt / Math.cos(p) + 0.02, D / 2],
    rotation: [0, 0, 0],
    material: 'obrobka',
  });

  // ---------- Kominy ----------
  for (const c of spec.chimneys) {
    const top = ridgeY + 0.7;
    out.push({
      elementKey: `dom.komin.${c.key}`,
      category: 'komin',
      primitive: { kind: 'box', size: [c.w, top - H, c.d] },
      position: [c.x, (top + H) / 2, c.z],
      rotation: [0, 0, 0],
      material: 'obrobka',
    });
  }

  // ---------- Części z płaskim dachem ----------
  for (const f of spec.flatParts) {
    const group = f.kind === 'garaz' ? 'garaz' : 'wejscie';
    out.push({
      elementKey: `dom.${group}.dach`,
      category: 'zadaszenie',
      primitive: { kind: 'box', size: [f.w, 0.3, f.d] },
      position: [f.x + f.w / 2, f.height - 0.15, f.z + f.d / 2],
      rotation: [0, 0, 0],
      material: 'obrobka',
    });
    if (f.enclosed) {
      out.push({
        elementKey: 'dom.fundament',
        category: 'fundament',
        primitive: { kind: 'box', size: [f.w + 0.04, -g, f.d + 0.04] },
        position: [f.x + f.w / 2, g / 2, f.z + f.d / 2],
        rotation: [0, 0, 0],
        material: 'cokol',
      });
      const wh = f.height - 0.3;
      const walls: { def: WallDef; id: WallId }[] = [
        {
          id: 'garaz-pd',
          def: {
            key: `dom.${group}.sciana-pd`,
            axis: 'x',
            s0: f.x,
            s1: f.x + f.w,
            outer: f.z + f.d,
            inward: -1,
            thickness: t,
            height: wh,
            baseY: 0,
            material: 'sciana-garaz',
          },
        },
        {
          id: 'garaz-wsch',
          def: {
            key: `dom.${group}.sciana-wsch`,
            axis: 'z',
            s0: f.z,
            s1: f.z + f.d - t,
            outer: f.x + f.w,
            inward: -1,
            thickness: t,
            height: wh,
            baseY: 0,
            material: 'sciana-garaz',
          },
        },
        {
          id: 'garaz-zach',
          def: {
            key: `dom.${group}.sciana-zach`,
            axis: 'z',
            s0: f.z,
            s1: f.z + f.d - t,
            outer: f.x,
            inward: 1,
            thickness: t,
            height: wh,
            baseY: 0,
            material: 'sciana-garaz',
          },
        },
      ];
      for (const w of walls) out.push(...buildWall(w.def, openingsOn(w.id)));
    } else {
      out.push({
        elementKey: `dom.${group}.posadzka`,
        category: 'taras',
        primitive: { kind: 'box', size: [f.w, -g, f.d] },
        position: [f.x + f.w / 2, g / 2, f.z + f.d / 2],
        rotation: [0, 0, 0],
        material: 'beton',
      });
      // podpory przy krawędzi frontowej: murowany filar na końcu + słup pośredni
      const posts: [number, number][] = [
        [f.x + 0.3, 0.6],
        [f.x + f.w / 2, 0.3],
      ];
      posts.forEach(([x, size], i) => {
        out.push({
          elementKey: `dom.${group}.slup-${i + 1}`,
          category: 'konstrukcja',
          primitive: { kind: 'box', size: [size, f.height - 0.3, size] },
          position: [x, (f.height - 0.3) / 2, f.z + f.d - size / 2],
          rotation: [0, 0, 0],
          material: i === 0 ? 'sciana' : 'beton',
        });
      });
    }
  }

  // ---------- Tarasy ----------
  for (const tr of spec.terraces) {
    out.push({
      elementKey: `dom.taras.${tr.key}`,
      category: 'taras',
      // wierzch tarasu na -0,02 (elewacja), spód na poziomie terenu
      primitive: { kind: 'box', size: [tr.w, -0.02 - g, tr.d] },
      position: [tr.x + tr.w / 2, (g - 0.02) / 2, tr.z + tr.d / 2],
      rotation: [0, 0, 0],
      material: 'taras',
    });
  }

  // ---------- Pergole ----------
  for (const pg of spec.pergolas) {
    const key = `dom.pergola.${pg.key}`;
    const ps = pg.postSize;
    const zs = pg.posts.map((pp) => pp[1]);
    const xLine = pg.posts[0]?.[0] ?? 0;
    pg.posts.forEach(([x, z], i) => {
      out.push({
        elementKey: `dom.pergola.slup-${i + 1}`,
        category: 'konstrukcja',
        primitive: { kind: 'box', size: [ps, pg.height - g, ps] },
        position: [x, (pg.height + g) / 2, z],
        rotation: [0, 0, 0],
        material: 'beton',
      });
      // belka od słupa do ściany
      out.push({
        elementKey: key,
        category: 'konstrukcja',
        primitive: { kind: 'box', size: [Math.abs(x), 0.3, ps] },
        position: [x / 2, pg.height - 0.15, z],
        rotation: [0, 0, 0],
        material: 'beton',
      });
    });
    if (zs.length > 1) {
      const z0 = Math.min(...zs);
      const z1 = Math.max(...zs);
      out.push({
        elementKey: key,
        category: 'konstrukcja',
        primitive: { kind: 'box', size: [ps, 0.3, z1 - z0 + ps] },
        position: [xLine, pg.height - 0.15, (z0 + z1) / 2],
        rotation: [0, 0, 0],
        material: 'beton',
      });
    }
  }

  return out;
}
