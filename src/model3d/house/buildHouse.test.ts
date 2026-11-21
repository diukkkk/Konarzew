import { isValidKey, labelFor } from '../../core/elementKeys';
import type { HouseSpec } from '../../core/types';
import { defaultHouseSpec } from '../index';
import { buildHouse, houseInfo } from './buildHouse';

const keys = (spec: HouseSpec) => buildHouse(spec).map((e) => e.elementKey);
const clone = (s: HouseSpec): HouseSpec => structuredClone(s);

describe('buildHouse', () => {
  it('K1: ten sam spec daje te same klucze w tej samej kolejności', () => {
    expect(keys(defaultHouseSpec)).toEqual(keys(clone(defaultHouseSpec)));
  });

  it('K1: zmiana wymiarów nie zmienia zestawu kluczy', () => {
    const s = clone(defaultHouseSpec);
    s.footprint.length = 22;
    s.mainBlock.depth = 10.5;
    for (const f of s.flatParts) f.z = 10.5; // część płaska nadal przylega do bryły głównej
    s.wallHeight = 3.2;
    s.roof.pitchDeg = 30;
    s.openings[0]!.offset += 0.3;
    expect(keys(s)).toEqual(keys(defaultHouseSpec));
  });

  it('K2: każdy klucz jest poprawny i ma polską etykietę', () => {
    for (const k of new Set(keys(defaultHouseSpec))) {
      expect(isValidKey(k), k).toBe(true);
      expect(labelFor(k), k).not.toBe(k);
    }
  });

  it('zawiera wszystkie wymagane części domu', () => {
    const set = new Set(keys(defaultHouseSpec));
    for (const k of [
      'dom.dach.polac-pn',
      'dom.dach.polac-pd',
      'dom.dach.kalenica',
      'dom.dach.okap-pn',
      'dom.dach.skrzynia-okapowa-pn',
      'dom.dach.murlata',
      'dom.dach.obrobki',
      'dom.sciana.pn',
      'dom.sciana.szczyt-zach',
      'dom.okno.szczyt-salon',
      'dom.drzwi.wejsciowe',
      'dom.brama.garaz',
      'dom.garaz.dach',
      'dom.wejscie.dach',
      'dom.taras.t1',
      'dom.komin.k1',
      'dom.fundament',
    ]) {
      expect(set.has(k), k).toBe(true);
    }
    for (const o of defaultHouseSpec.openings) {
      const prefix = o.kind === 'okno' ? 'dom.okno' : o.kind === 'drzwi' ? 'dom.drzwi' : 'dom.brama';
      expect(set.has(`${prefix}.${o.key}`), o.key).toBe(true);
    }
  });

  it('murłata jest domyślnie ukryta (widoczna w trybie bez dachu)', () => {
    const m = buildHouse(defaultHouseSpec).filter((e) => e.elementKey === 'dom.dach.murlata');
    expect(m.length).toBeGreaterThan(0);
    expect(m.every((e) => e.hiddenByDefault)).toBe(true);
  });

  it('K4: zmiana kąta dachu zmienia nachylenie połaci i wysokość kalenicy', () => {
    const s = clone(defaultHouseSpec);
    s.roof.pitchDeg = 45;
    const rot = (spec: HouseSpec) =>
      buildHouse(spec).find((e) => e.elementKey === 'dom.dach.polac-pn')!.rotation[0];
    expect(rot(s)).toBeCloseTo((-45 * Math.PI) / 180);
    expect(houseInfo(s).ridgeTop).toBeGreaterThan(houseInfo(defaultHouseSpec).ridgeTop);
  });

  it('kalenica wychodzi zgodnie z elewacjami (+6,58 konstr. / +6,89 z pokryciem, ±0,15 m)', () => {
    const { ridgeTop } = houseInfo(defaultHouseSpec);
    expect(ridgeTop).toBeGreaterThan(6.58 - 0.15);
    expect(ridgeTop).toBeLessThan(6.89 + 0.15);
  });

  it('K5: generator działa szybko (< 50 ms)', () => {
    const t0 = performance.now();
    buildHouse(defaultHouseSpec);
    expect(performance.now() - t0).toBeLessThan(50);
  });
});
