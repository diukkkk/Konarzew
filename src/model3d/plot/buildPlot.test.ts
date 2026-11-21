import { defaultHouseSpec } from '../index';
import { buildPlot, forestTrees, pointInPolygon, polygonArea } from './buildPlot';

const plot = defaultHouseSpec.plot!;

describe('buildPlot', () => {
  it('działka ma sensowną powierzchnię (szacunek z mapy, 4 500–5 500 m²)', () => {
    const a = polygonArea(plot.boundary);
    expect(a).toBeGreaterThan(4500);
    expect(a).toBeLessThan(5500);
  });

  it('dom stoi w całości na działce', () => {
    const { x, z, rotationDeg } = plot.housePosition;
    const r = (rotationDeg * Math.PI) / 180;
    const L = defaultHouseSpec.footprint.length;
    const W = defaultHouseSpec.footprint.width;
    for (const [lx, lz] of [
      [0, 0],
      [L, 0],
      [L, W],
      [0, W],
    ] as const) {
      const wx = x + lx * Math.cos(r) + lz * Math.sin(r);
      const wz = z - lx * Math.sin(r) + lz * Math.cos(r);
      expect(pointInPolygon([wx, wz], plot.boundary)).toBe(true);
    }
  });

  it('las dookoła jest zawsze taki sam i leży poza działką', () => {
    const a = forestTrees(plot);
    expect(a).toEqual(forestTrees(plot));
    expect(a.length).toBeGreaterThan(50);
    for (const t of a) expect(pointInPolygon([t.x, t.z], plot.boundary)).toBe(false);
  });

  it('drzewa z ortofotomapy i strefy są klikalne, las nie', () => {
    const els = buildPlot(plot, -0.3);
    expect(els.some((e) => e.elementKey === 'dzialka.drzewo.s1' && e.clickable !== false)).toBe(true);
    expect(els.some((e) => e.elementKey === 'dzialka.strefa.podjazd')).toBe(true);
    expect(els.filter((e) => e.elementKey === 'dzialka.las').every((e) => e.clickable === false)).toBe(true);
  });
});
