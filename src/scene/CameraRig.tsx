import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { HouseSpec } from '../core/types';
import { useViewStore, type CameraPreset } from '../state/viewStore';
import { houseCenterWorld, houseToWorld, plotCenterWorld } from './worldMath';

type V3 = [number, number, number];

function presetPose(spec: HouseSpec, preset: CameraPreset): { target: V3; position: V3 } {
  const h = houseCenterWorld(spec);
  if (preset === 'gora') return { target: [h[0], 0, h[2]], position: [h[0], 70, h[2] + 0.01] };
  if (preset === 'ogrod') {
    // jak zdjęcie 21: z ogrodu, od narożnika salonu — strona ogrodowa i szczyt z pergolą
    return { target: [h[0], 2.5, h[2]], position: houseToWorld(spec, [-17, 4, -19]) };
  }
  if (preset === 'dzialka') {
    const p = plotCenterWorld(spec);
    return { target: p, position: [p[0] - 30, 115, p[2] + 115] };
  }
  // „dom”: widok z południowego zachodu — front z wejściem i szczyt salonu
  return { target: [h[0], 2, h[2]], position: [h[0] - 32, 30, h[2] + 44] };
}

/** Ustawia kamerę na żądanie z viewStore (przyciski „Dom”, „Z góry”, „Cała działka”). */
export function CameraRig({ spec }: { spec: HouseSpec }) {
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const camera = useThree((s) => s.camera);
  const request = useViewStore((s) => s.cameraRequest);

  useEffect(() => {
    if (!controls) return;
    const { target, position } = presetPose(spec, request.preset);
    controls.target.set(...target);
    camera.position.set(...position);
    controls.update();
  }, [controls, camera, spec, request]);

  return null;
}
