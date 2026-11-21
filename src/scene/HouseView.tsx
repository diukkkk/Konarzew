import { useMemo } from 'react';
import type { HouseSpec } from '../core/types';
import { buildHouse } from '../model3d';
import { useViewStore } from '../state/viewStore';
import { ElementMesh } from './ElementMesh';

const DEG = Math.PI / 180;

export function HouseView({ spec }: { spec: HouseSpec }) {
  const elements = useMemo(() => buildHouse(spec), [spec]);
  const mode = useViewStore((s) => s.interiorMode);
  const noRoof = mode !== 'zewnatrz';
  const visible = elements.filter((el) =>
    noRoof
      ? !(el.category === 'dach' || el.category === 'okap' || el.category === 'komin')
      : !el.hiddenByDefault,
  );
  const hp = spec.plot?.housePosition ?? { x: 0, z: 0, rotationDeg: 0 };
  return (
    <group position={[hp.x, 0, hp.z]} rotation={[0, hp.rotationDeg * DEG, 0]}>
      {visible.map((el, i) => (
        <ElementMesh key={`${el.elementKey}#${i}`} el={el} />
      ))}
    </group>
  );
}
