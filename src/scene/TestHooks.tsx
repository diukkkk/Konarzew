import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Box3, Vector3, type Object3D } from 'three';
import './testHooksTypes';

/** Pomocnik testów e2e: pozwala kliknąć konkretny element modelu bez zgadywania współrzędnych. */
export function TestHooks() {
  const { scene, camera, gl } = useThree();
  useEffect(() => {
    const find = (key: string): Object3D[] => {
      const found: Object3D[] = [];
      scene.traverse((o) => {
        if (o.userData.elementKey === key) found.push(o);
      });
      return found;
    };
    (window as unknown as { __info: () => unknown }).__info = () => ({
      ...gl.info.render,
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
    });
    window.__konarzew = {
      screenPositionOf: (key) => {
        const objs = find(key);
        if (!objs.length) return null;
        // środek pierwszej bryły elementu (element może mieć kilka rozsuniętych brył, np. murłata)
        const v = new Box3().setFromObject(objs[0]!).getCenter(new Vector3()).project(camera);
        const r = gl.domElement.getBoundingClientRect();
        return { x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height };
      },
      elementKeys: () => {
        const keys = new Set<string>();
        scene.traverse((o) => {
          if (typeof o.userData.elementKey === 'string') keys.add(o.userData.elementKey);
        });
        return [...keys].sort();
      },
    };
    return () => {
      delete window.__konarzew;
    };
  }, [scene, camera, gl]);
  return null;
}
