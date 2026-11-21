import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { Object3D } from 'three';
import type { HouseSpec } from '../core/types';
import { useSelectionStore } from '../state/selectionStore';
import { CameraRig } from './CameraRig';
import { HouseView } from './HouseView';
import { PlotView } from './PlotView';
import { TestHooks } from './TestHooks';
import { houseCenterWorld } from './worldMath';

/** Scena 3D: dom na działce w stylu rysunkowym. Dane przychodzą przez props (bez dostępu do bazy). */
export default function Scene({ spec }: { spec: HouseSpec }) {
  const center = houseCenterWorld(spec);
  const sunTarget = useMemo(() => new Object3D(), []);
  sunTarget.position.set(center[0], 0, center[2]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 30, near: 0.5, far: 2000, position: [center[0] - 32, 30, center[2] + 44] }}
      onPointerMissed={(e) => {
        if (e.type === 'click') useSelectionStore.getState().clear();
      }}
      data-testid="scene-canvas"
    >
      <color attach="background" args={['#cfe6f3']} />
      <fog attach="fog" args={['#cfe6f3', 180, 520]} />
      <hemisphereLight args={['#ffffff', '#7d8b5a', 1.1]} />
      <primitive object={sunTarget} />
      <directionalLight
        position={[center[0] - 25, 45, center[2] + 30]}
        target={sunTarget}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-camera-far={150}
        shadow-bias={-0.0005}
      />
      {spec.plot && <PlotView plot={spec.plot} groundY={spec.groundLevel} />}
      <HouseView spec={spec} />
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2.1}
        minDistance={6}
        maxDistance={400}
        enableDamping
      />
      <CameraRig spec={spec} />
      <TestHooks />
    </Canvas>
  );
}
