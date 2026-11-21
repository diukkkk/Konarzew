import { useMemo } from 'react';
import type { PlotSpec } from '../core/types';
import { buildPlot } from '../model3d';
import { ElementMesh } from './ElementMesh';

export function PlotView({ plot, groundY }: { plot: PlotSpec; groundY: number }) {
  const elements = useMemo(() => buildPlot(plot, groundY), [plot, groundY]);
  return (
    <group>
      {elements.map((el, i) => (
        <ElementMesh key={`${el.elementKey}#${i}`} el={el} />
      ))}
    </group>
  );
}
