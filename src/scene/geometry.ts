import {
  BoxGeometry,
  BufferGeometry,
  ConeGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  IcosahedronGeometry,
  Path,
  Shape,
  Vector2,
} from 'three';
import type { Primitive } from '../model3d/types';

const cache = new Map<string, BufferGeometry>();

/** Zamienia opis bryły z generatora na geometrię three.js (z pamięcią podręczną dla identycznych brył). */
export function geometryFor(p: Primitive): BufferGeometry {
  const id = JSON.stringify(p);
  const hit = cache.get(id);
  if (hit) return hit;
  let g: BufferGeometry;
  switch (p.kind) {
    case 'box':
      g = new BoxGeometry(...p.size);
      break;
    case 'cylinder':
      g = new CylinderGeometry(p.radiusTop, p.radiusBottom, p.height, p.segments);
      break;
    case 'cone':
      g = new ConeGeometry(p.radius, p.height, p.segments);
      break;
    case 'sphere':
      g = new IcosahedronGeometry(p.radius, p.detail);
      break;
    case 'extrude': {
      const shape = new Shape(p.outline.map(([x, y]) => new Vector2(x, y)));
      for (const h of p.holes ?? []) shape.holes.push(new Path(h.map(([x, y]) => new Vector2(x, y))));
      g = new ExtrudeGeometry(shape, { depth: p.depth, bevelEnabled: false });
      break;
    }
  }
  cache.set(id, g);
  return g;
}
