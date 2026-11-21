import { Edges, Outlines } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import type { BuiltElement } from '../model3d/types';
import { useSelectionStore } from '../state/selectionStore';
import { geometryFor } from './geometry';
import { edgeMode, materialFor, primitiveFor, styleId, variantFor } from './style';
import { outline } from './palette';

const noRaycast = () => null;
// „realizm”: korona brzozy z kilku kulek, sosna z warstw — bardziej naturalna sylwetka
const BIRCH_BLOBS: [number, number, number, number][] = [
  [0.55, -0.25, 0.2, 0.62],
  [-0.5, -0.1, -0.3, 0.58],
  [0.1, 0.45, -0.45, 0.55],
  [-0.2, -0.45, 0.5, 0.5],
];
const PINE_LAYERS: [number, number][] = [
  [-0.18, 1.12],
  [0.22, 0.78],
];
const CLICK_TOLERANCE_PX = 5;

/** Jedna klikalna bryła. Zaznaczenie i podświetlenie dotyczą wszystkich brył o tym samym elementKey. */
export const ElementMesh = memo(function ElementMesh({ el }: { el: BuiltElement }) {
  const key = el.elementKey;
  const clickable = el.clickable !== false;
  const selected = useSelectionStore((s) => clickable && s.selectedElementKey === key);
  const hovered = useSelectionStore((s) => clickable && s.hoveredElementKey === key);
  const geometry = useMemo(
    () => geometryFor(primitiveFor(el.primitive, el.material)),
    [el.primitive, el.material],
  );
  const material = materialFor(
    el.material,
    selected ? 'selected' : hovered ? 'hover' : 'normal',
    variantFor(el.material, key),
  );

  const handlers = clickable
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          useSelectionStore.getState().hover(key);
          document.body.style.cursor = 'pointer';
        },
        onPointerOut: () => {
          if (useSelectionStore.getState().hoveredElementKey === key)
            useSelectionStore.getState().hover(null);
          document.body.style.cursor = '';
        },
        onClick: (e: ThreeEvent<MouseEvent>) => {
          if (e.delta > CLICK_TOLERANCE_PX) return; // to było przeciągnięcie (obrót kamery), nie kliknięcie
          e.stopPropagation();
          useSelectionStore.getState().select(key, [e.point.x, e.point.y, e.point.z]);
        },
      }
    : { raycast: noRaycast };

  const big = el.category === 'teren';
  return (
    <mesh
      geometry={geometry}
      material={material}
      position={el.position}
      rotation={el.rotation}
      scale={el.scale ?? [1, 1, 1]}
      castShadow={!big && el.category !== 'strefa'}
      receiveShadow
      userData={{ elementKey: key }}
      {...handlers}
    >
      {styleId === 'realizm' &&
        el.primitive.kind === 'sphere' &&
        el.material === 'korona-brzoza' &&
        BIRCH_BLOBS.map(([x, y, z, k], i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={materialFor(
              el.material,
              'normal',
              variantFor(el.material, key + i) * (0.92 + i * 0.04),
            )}
            position={[
              x * (el.primitive as { radius: number }).radius,
              y * (el.primitive as { radius: number }).radius,
              z * (el.primitive as { radius: number }).radius,
            ]}
            scale={[k, k, k]}
            castShadow
            receiveShadow
            raycast={noRaycast}
          />
        ))}
      {styleId === 'realizm' &&
        el.primitive.kind === 'cone' &&
        el.material === 'korona-sosna' &&
        PINE_LAYERS.map(([y, k], i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={materialFor(el.material, 'normal', 0.9 + i * 0.08)}
            position={[0, y * (el.primitive as { height: number }).height, 0]}
            scale={[k, k, k]}
            castShadow
            receiveShadow
            raycast={noRaycast}
          />
        ))}
      {edgeMode === 'cienkie' && !el.noOutline && !big && (
        <Edges threshold={25} color={selected ? '#7c2d12' : outline} />
      )}
      {edgeMode === 'gruby' &&
        !big &&
        el.category !== 'strefa' &&
        el.category !== 'las' &&
        el.category !== 'drzewo' && (
          <Edges threshold={25} lineWidth={2.6} color={selected ? '#7c2d12' : outline} />
        )}
      {edgeMode === 'gruby' && (el.category === 'las' || el.category === 'drzewo') && (
        <Outlines thickness={0.1} color={outline} />
      )}
    </mesh>
  );
});
