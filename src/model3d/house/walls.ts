import type { Opening } from '../../core/types';
import type { BuiltElement, MaterialId, Pt2, Vec3 } from '../types';

/**
 * Ściana prosta: biegnie wzdłuż osi `axis` od s0 do s1, jej zewnętrzna płaszczyzna leży na współrzędnej `outer`,
 * a grubość idzie do środka budynku w kierunku `inward` (+1 / -1).
 */
export interface WallDef {
  key: string;
  axis: 'x' | 'z';
  s0: number;
  s1: number;
  outer: number;
  inward: 1 | -1;
  thickness: number;
  /** Kształt w układzie ściany (u wzdłuż ściany od s0, v = wysokość). Domyślnie prostokąt 0..height. */
  outline?: Pt2[];
  height: number;
  baseY: number;
  material: MaterialId;
  category?: BuiltElement['category'];
}

const HALF_PI = Math.PI / 2;

function frame(w: WallDef): { origin: Vec3; rotation: Vec3 } {
  if (w.axis === 'x') {
    const z = w.inward === 1 ? w.outer : w.outer - w.thickness;
    return { origin: [w.s0, w.baseY, z], rotation: [0, 0, 0] };
  }
  // oś z: obrót -90° wokół Y → lokalne x = świat +z, lokalne z = świat -x
  const x = w.inward === 1 ? w.outer + w.thickness : w.outer;
  return { origin: [x, w.baseY, w.s0], rotation: [0, -HALF_PI, 0] };
}

function toWorld(w: WallDef, origin: Vec3, u: number, v: number, d: number): Vec3 {
  return w.axis === 'x'
    ? [origin[0] + u, origin[1] + v, origin[2] + d]
    : [origin[0] - d, origin[1] + v, origin[2] + u];
}

/** Głębokość (lokalne z) zewnętrznej płaszczyzny ściany: 0 albo grubość. */
function outerDepth(w: WallDef): number {
  return (w.axis === 'x') === (w.inward === 1) ? 0 : w.thickness;
}

export function buildWall(w: WallDef, openings: Opening[], extraHoles: Pt2[][] = []): BuiltElement[] {
  const { origin, rotation } = frame(w);
  const len = w.s1 - w.s0;
  const outline: Pt2[] = w.outline ?? [
    [0, 0],
    [len, 0],
    [len, w.height],
    [0, w.height],
  ];
  const holes: Pt2[][] = [...extraHoles];
  const out: BuiltElement[] = [];
  const od = outerDepth(w);
  const glassDepth = od === 0 ? 0.12 : w.thickness - 0.12;

  for (const o of openings) {
    const u0 = o.offset - w.s0;
    const v0 = o.sill - w.baseY;
    holes.push([
      [u0, v0],
      [u0 + o.width, v0],
      [u0 + o.width, v0 + o.height],
      [u0, v0 + o.height],
    ]);
    const prefix = o.kind === 'okno' ? 'dom.okno' : o.kind === 'drzwi' ? 'dom.drzwi' : 'dom.brama';
    const material: MaterialId =
      o.kind === 'okno' ? 'szklo' : o.kind === 'brama' ? 'brama' : o.key === 'hs-salon' ? 'szklo' : 'drzwi';
    out.push({
      elementKey: `${prefix}.${o.key}`,
      category: 'otwor',
      primitive: { kind: 'box', size: [o.width, o.height, 0.08] },
      position: toWorld(w, origin, u0 + o.width / 2, v0 + o.height / 2, glassDepth),
      rotation,
      material,
    });
  }

  out.unshift({
    elementKey: w.key,
    category: w.category ?? 'sciana',
    primitive: { kind: 'extrude', outline, holes, depth: w.thickness },
    position: origin,
    rotation,
    material: w.material,
  });
  return out;
}

/** Element w płaszczyźnie ściany (np. przeszklenie w szczycie) jako cienki kształt. */
export function buildInWall(
  w: WallDef,
  key: string,
  shape: Pt2[],
  material: MaterialId,
  category: BuiltElement['category'],
): BuiltElement {
  const { origin, rotation } = frame(w);
  const od = outerDepth(w);
  const depth = 0.08;
  const d = od === 0 ? 0.12 : w.thickness - 0.12 - depth;
  const pos = toWorld(w, origin, 0, 0, d);
  return {
    elementKey: key,
    category,
    primitive: { kind: 'extrude', outline: shape, depth },
    position: pos,
    rotation,
    material,
  };
}
