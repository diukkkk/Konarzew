import { DataTexture, MeshToonMaterial, NearestFilter, RedFormat } from 'three';
import type { MaterialId } from '../model3d/types';
import { accent, palette } from './palette';

let gradient: DataTexture | null = null;

/** 4-stopniowe cieniowanie „toon” — płaskie plamy światła jak w rysunku. */
function toonGradient(): DataTexture {
  if (!gradient) {
    gradient = new DataTexture(new Uint8Array([110, 165, 215, 255]), 4, 1, RedFormat);
    gradient.minFilter = NearestFilter;
    gradient.magFilter = NearestFilter;
    gradient.generateMipmaps = false;
    gradient.needsUpdate = true;
  }
  return gradient;
}

export type MaterialState = 'normal' | 'hover' | 'selected';
const cache = new Map<string, MeshToonMaterial>();

export function materialFor(id: MaterialId, state: MaterialState): MeshToonMaterial {
  const k = `${id}:${state}`;
  let m = cache.get(k);
  if (!m) {
    m = new MeshToonMaterial({
      color: state === 'selected' ? accent : palette[id],
      gradientMap: toonGradient(),
    });
    if (state === 'hover') m.emissive.set('#ffffff').multiplyScalar(0.18);
    if (id === 'szklo') {
      m.transparent = state === 'normal';
      m.opacity = 0.85;
    }
    cache.set(k, m);
  }
  return m;
}
