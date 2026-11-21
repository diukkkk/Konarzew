import { Edges, Outlines } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import type { BuiltElement } from '../model3d/types';
import { useSelectionStore } from '../state/selectionStore';
import { geometryFor } from './geometry';
import { edgeMode, materialFor, primitiveFor, variantFor } from './style';
import { outline } from './palette';

const noRaycast = () => null;
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
