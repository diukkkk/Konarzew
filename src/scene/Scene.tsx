import { OrbitControls } from '@react-three/drei';
import {
  Bloom,
  EffectComposer,
  TiltShift2,
  Vignette,
  N8AO,
  HueSaturation,
  BrightnessContrast,
} from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { Object3D } from 'three';
import type { HouseSpec } from '../core/types';
import { useSelectionStore } from '../state/selectionStore';
import { CameraRig } from './CameraRig';
import { HouseView } from './HouseView';
import { PlotView } from './PlotView';
import { TestHooks } from './TestHooks';
import { styleId } from './style';
import { houseCenterWorld } from './worldMath';

const look = {
  obecny: {
    bg: '#cfe6f3',
    sky: '#ffffff',
    ground: '#9aa77a',
    hemi: 1.4,
    sun: '#ffffff',
    sunI: 2.2,
    sunPos: [-40, 42, -6],
  },
  strategia: {
    bg: '#bfdcef',
    sky: '#cfe3ff',
    ground: '#6d7a3a',
    hemi: 1.1,
    sun: '#ffe2b0',
    sunI: 3.4,
    sunPos: [-38, 30, -18],
  },
  lowpoly: {
    bg: '#d9eef7',
    sky: '#ffffff',
    ground: '#b9c9a0',
    hemi: 1.7,
    sun: '#ffffff',
    sunI: 1.9,
    sunPos: [-30, 50, 10],
  },
  komiks: {
    bg: '#bfe3f7',
    sky: '#ffffff',
    ground: '#9ab36a',
    hemi: 1.5,
    sun: '#fff6e0',
    sunI: 2.4,
    sunPos: [-40, 42, -6],
  },
  realizm: {
    bg: '#b9d6ec',
    sky: '#d6e6ff',
    ground: '#6d7a3a',
    hemi: 1.0,
    sun: '#ffe6bd',
    sunI: 3.6,
    sunPos: [-38, 30, -18],
  },
  makieta: {
    bg: '#f1ede6',
    sky: '#ffffff',
    ground: '#d9d2c2',
    hemi: 1.6,
    sun: '#fff8ee',
    sunI: 2.2,
    sunPos: [-35, 45, -20],
  },
}[styleId];

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
      <color attach="background" args={[look.bg]} />
      <fog
        attach="fog"
        args={[look.bg, styleId === 'makieta' ? 120 : 180, styleId === 'makieta' ? 320 : 520]}
      />
      <hemisphereLight args={[look.sky, look.ground, look.hemi]} />
      <primitive object={sunTarget} />
      <directionalLight
        position={[center[0] + look.sunPos[0]!, look.sunPos[1]!, center[2] + look.sunPos[2]!]}
        target={sunTarget}
        color={look.sun}
        intensity={look.sunI}
        castShadow
        shadow-mapSize={styleId === 'realizm' ? [4096, 4096] : [2048, 2048]}
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
      {(styleId === 'strategia' || styleId === 'realizm') && (
        <EffectComposer multisampling={4}>
          <N8AO aoRadius={2.5} intensity={2.2} distanceFalloff={1} color="#2b3a55" />
          <HueSaturation saturation={0.04} />
          <BrightnessContrast contrast={0.06} />
          <Vignette offset={0.25} darkness={0.45} />
        </EffectComposer>
      )}
      {styleId === 'makieta' && (
        <EffectComposer multisampling={4}>
          <N8AO aoRadius={3} intensity={3} distanceFalloff={1} />
          <TiltShift2 blur={0.22} />
          <Bloom intensity={0.15} luminanceThreshold={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
