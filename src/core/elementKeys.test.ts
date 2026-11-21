import { breadcrumbFor, isValidKey, labelFor, parentOf, startsWithPrefix } from './elementKeys';

describe('elementKeys', () => {
  it('waliduje format kluczy', () => {
    expect(isValidKey('dom.dach.polac-pd')).toBe(true);
    expect(isValidKey('dom.okno.o-salon-1')).toBe(true);
    expect(isValidKey('Dom.Dach')).toBe(false);
    expect(isValidKey('dom.dach.połać')).toBe(false);
    expect(isValidKey('inne.cos')).toBe(false);
  });
  it('rodzic, prefiks, ścieżka', () => {
    expect(parentOf('dom.dach.polac-pd')).toBe('dom.dach');
    expect(parentOf('dom')).toBeNull();
    expect(startsWithPrefix('dom.dach.kalenica', 'dom.dach')).toBe(true);
    expect(startsWithPrefix('dom.dachowka', 'dom.dach')).toBe(false);
    expect(breadcrumbFor('dom.dach.polac-pd')).toEqual(['Dom', 'Dach', 'Połać od frontu']);
  });
  it('etykiety okien i drzew', () => {
    expect(labelFor('dom.okno.o-salon-1')).toBe('Okno salon 1');
    expect(labelFor('dzialka.drzewo.d4')).toBe('Drzewo d4');
  });
});
