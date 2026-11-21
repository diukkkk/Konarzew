// Klucze elementów 3D — NAJWAŻNIEJSZY KONTRAKT (docs/plan/03-model-danych.md, sekcja „Klucze elementów”).
// Format: strefa.grupa.element[-wariant], małe litery, bez polskich znaków.

const KEY_RE = /^(dom|wnetrze|dzialka|instalacja)(\.[a-z0-9]+(-[a-z0-9]+)*)+$/;

export function isValidKey(key: string): boolean {
  return KEY_RE.test(key);
}

/** 'dom.dach.polac-pd' → 'dom.dach'; dla klucza bez rodzica zwraca null. */
export function parentOf(key: string): string | null {
  const i = key.lastIndexOf('.');
  return i > 0 ? key.slice(0, i) : null;
}

export function startsWithPrefix(key: string, prefix: string): boolean {
  return key === prefix || key.startsWith(prefix + '.');
}

const EXACT: Record<string, string> = {
  dom: 'Dom',
  'dom.dach': 'Dach',
  'dom.dach.polac-pn': 'Połać od ogrodu',
  'dom.dach.polac-pd': 'Połać od frontu',
  'dom.dach.kalenica': 'Kalenica',
  'dom.dach.okap-pn': 'Okap i rynna od ogrodu',
  'dom.dach.okap-pd': 'Okap i rynna od frontu',
  'dom.dach.skrzynia-okapowa-pn': 'Skrzynia okapowa od ogrodu',
  'dom.dach.skrzynia-okapowa-pd': 'Skrzynia okapowa od frontu',
  'dom.dach.murlata': 'Murłata',
  'dom.dach.obrobki': 'Obróbki blacharskie szczytów',
  'dom.sciana': 'Ściany',
  'dom.sciana.pn': 'Ściana ogrodowa',
  'dom.sciana.pd': 'Ściana frontowa (wejście)',
  'dom.sciana.zach': 'Ściana szczytowa salonu',
  'dom.sciana.wsch': 'Ściana szczytowa sypialni',
  'dom.sciana.szczyt-zach': 'Szczyt nad salonem',
  'dom.sciana.szczyt-wsch': 'Szczyt nad sypialnią',
  'dom.garaz': 'Garaż',
  'dom.garaz.dach': 'Dach płaski garażu',
  'dom.garaz.sciana-pd': 'Ściana garażu z bramą',
  'dom.garaz.sciana-wsch': 'Ściana boczna garażu',
  'dom.garaz.sciana-zach': 'Ściana garażu od wejścia',
  'dom.wejscie': 'Strefa wejścia',
  'dom.wejscie.dach': 'Zadaszenie wejścia',
  'dom.wejscie.posadzka': 'Posadzka pod zadaszeniem',
  'dom.fundament': 'Fundament i cokół',
  'dom.okno': 'Okna',
  'dom.drzwi': 'Drzwi',
  'dom.brama': 'Bramy',
  'dom.komin': 'Kominy',
  'dom.taras': 'Tarasy',
  'dom.pergola': 'Pergola',
  dzialka: 'Działka',
  'dzialka.teren': 'Teren działki',
  'dzialka.granica': 'Granica działki',
  'dzialka.drzewo': 'Drzewa',
  'dzialka.strefa': 'Strefy działki',
  'dzialka.las': 'Las dookoła',
};

const OPENING_NAMES: Record<string, string> = {
  'o-salon-1': 'salon 1',
  'o-salon-2': 'salon 2',
  'o-gabinet': 'gabinet',
  'o-pokoj-1': 'pokój 1',
  'o-pokoj-2': 'pokój 2',
  'o-sypialnia-pn': 'sypialnia (ogród)',
  'o-sypialnia-wsch': 'sypialnia (szczyt)',
  'o-jadalnia': 'jadalnia',
  'o-kuchnia': 'kuchnia (front)',
  'o-kuchnia-zach': 'kuchnia (szczyt)',
  'o-lazienka': 'łazienka',
  'o-wejscie': 'przy wejściu',
  'o-07': 'nr 07',
  'hs-salon': 'tarasowe HS w salonie',
  wejsciowe: 'wejściowe',
  'garaz-techniczne': 'techniczne garażu',
  garaz: 'garażowa',
  'szczyt-salon': 'przeszklenie w szczycie salonu',
};

const GROUP_WORD: Record<string, string> = {
  okno: 'Okno',
  drzwi: 'Drzwi',
  brama: 'Brama',
  komin: 'Komin',
  taras: 'Taras',
  drzewo: 'Drzewo',
};

/** Polska etykieta elementu do interfejsu, np. 'dom.dach.polac-pd' → 'Połać od frontu'. */
export function labelFor(key: string): string {
  const exact = EXACT[key];
  if (exact) return exact;
  const parts = key.split('.');
  const [zone, group, ...rest] = parts;
  const tail = rest.join('.');
  if (zone === 'dom' && group && GROUP_WORD[group]) {
    return `${GROUP_WORD[group]} ${OPENING_NAMES[tail] ?? tail}`;
  }
  if (zone === 'dom' && group === 'pergola')
    return tail.startsWith('slup') ? `Słup pergoli ${tail.slice(5)}` : 'Pergola';
  if (zone === 'dom' && group === 'wejscie' && tail.startsWith('slup'))
    return `Słup zadaszenia ${tail.slice(5)}`;
  if (zone === 'dzialka' && group === 'drzewo') return `Drzewo ${tail}`;
  if (zone === 'dzialka' && group === 'strefa') {
    const names: Record<string, string> = { podjazd: 'Podjazd', oczyszczalnia: 'Oczyszczalnia / drenaż' };
    return names[tail] ?? `Strefa ${tail}`;
  }
  return key;
}

/** Ścieżka do wyświetlenia: 'dom.dach.polac-pd' → ['Dom', 'Dach', 'Połać od frontu']. */
export function breadcrumbFor(key: string): string[] {
  const out: string[] = [];
  let k: string | null = key;
  while (k) {
    out.unshift(labelFor(k));
    k = parentOf(k);
  }
  return out;
}
