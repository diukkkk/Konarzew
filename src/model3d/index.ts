import type { HouseSpec } from '../core/types';
import defaultSpecJson from './specs/house.default.json';

export { buildHouse, houseInfo } from './house/buildHouse';
export { buildPlot, forestTrees, polygonArea, pointInPolygon } from './plot/buildPlot';
export type { BuiltElement, Primitive, MaterialId, ElementCategory } from './types';

/** Domyślna specyfikacja domu (dane z rzutów, docs/plan/raporty). Do czasu T02 scena czyta ją bezpośrednio. */
export const defaultHouseSpec = defaultSpecJson as unknown as HouseSpec;
