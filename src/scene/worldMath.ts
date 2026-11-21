import type { HouseSpec } from '../core/types';
import { houseInfo } from '../model3d';

const DEG = Math.PI / 180;

/** Punkt z układu domu → układ działki/świata (obrót wokół Y jak w three.js). */
export function houseToWorld(spec: HouseSpec, [x, y, z]: [number, number, number]): [number, number, number] {
  const hp = spec.plot?.housePosition ?? { x: 0, z: 0, rotationDeg: 0 };
  const a = hp.rotationDeg * DEG;
  return [hp.x + x * Math.cos(a) + z * Math.sin(a), y, hp.z - x * Math.sin(a) + z * Math.cos(a)];
}

export function houseCenterWorld(spec: HouseSpec): [number, number, number] {
  return houseToWorld(spec, houseInfo(spec).center);
}

export function plotCenterWorld(spec: HouseSpec): [number, number, number] {
  const b = spec.plot?.boundary;
  if (!b?.length) return houseCenterWorld(spec);
  const xs = b.map((p) => p[0]);
  const zs = b.map((p) => p[1]);
  return [(Math.min(...xs) + Math.max(...xs)) / 2, 0, (Math.min(...zs) + Math.max(...zs)) / 2];
}
