# 03 — Model danych (kanoniczny)

> Po T02 źródłem prawdy jest `src/core/types.ts`. Ten plik opisuje „dlaczego”; przy rozbieżności popraw ten plik.

## Zasady

- `id`: UUID v4 (`crypto.randomUUID()`), generowany lokalnie — dzięki temu działa bez serwera i bez kolizji przy synchronizacji.
- Daty: ISO 8601 string (`2026-11-21T07:31:00Z`).
- Miękkie usuwanie: `deletedAt` ≠ null = usunięte (potrzebne do synchronizacji). Listy domyślnie je pomijają.
- `createdBy`: `'local'` w fazach 1–3; ID użytkownika w fazie 4.
- Zmiana schematu = nowa wersja `db.version(n)` w Dexie z migracją + wpis w `DECYZJE.md`.

## Typy

```ts
type ISODate = string;
type UUID = string;

interface BaseRecord {
  id: UUID;
  createdAt: ISODate;
  updatedAt: ISODate;
  deletedAt: ISODate | null;
  createdBy: string; // 'local' | userId
}

// ---------- Model domu ----------
type VersionKind = 'stan' | 'wizja' | 'wariant';
interface ModelVersion extends BaseRecord {
  name: string; // "Stan aktualny", "Wizja 2027"
  kind: VersionKind;
  basedOnId: UUID | null; // z której wersji skopiowano
  spec: HouseSpec; // pełne parametry domu + działki
  isActive: boolean; // dokładnie jedna aktywna
}

interface HouseSpec {
  // jednostki: metry, stopnie; układ: X wschód, Z południe, Y góra; (0,0,0) = narożnik PN-Zach. obrysu na poziomie ±0
  schemaVersion: 1;
  footprint: { length: number; width: number }; // obrys zewn. ścian
  wallThickness: number;
  floorHeights: number[]; // [parter, poddasze]
  roof: {
    type: 'dwuspadowy';
    pitchDeg: number;
    overhangEaves: number;
    overhangGable: number;
    ridgeHeight?: number;
    material: 'blacha-rabek' | 'dachowka' | 'inny';
  };
  openings: Opening[]; // okna/drzwi
  terraces: { key: string; x: number; z: number; w: number; d: number; covered: boolean }[];
  chimneys: { key: string; x: number; z: number; w: number; d: number }[];
  rooms: Room[]; // wnętrze (faza 2)
  plot?: PlotSpec; // działka (faza 2)
  extras?: Record<string, unknown>; // pole na eksperymenty — nie używać w logice rdzenia
}
interface Opening {
  key: string;
  kind: 'okno' | 'drzwi' | 'brama' | 'swietlik';
  wall: 'pn' | 'pd' | 'wsch' | 'zach' | 'dach-pn' | 'dach-pd';
  floor: number;
  offset: number;
  width: number;
  height: number;
  sill: number;
}
interface Room {
  key: string;
  name: string;
  floor: number;
  polygon: [number, number][];
  height?: number;
}
interface PlotSpec {
  boundary: [number, number][]; // obrys działki w metrach
  housePosition: { x: number; z: number; rotationDeg: number };
  mapMediaId: UUID | null; // mapka/satelita jako podłoże
  mapCalibration: { p1: [number, number]; p2: [number, number]; meters: number } | null; // dwa punkty na obrazie + odległość
  trees: { key: string; x: number; z: number; crown: number; height: number; kind?: string }[];
  zones: {
    key: string;
    name: string;
    polygon: [number, number][];
    kind: 'podjazd' | 'ogrod' | 'trawnik' | 'oczyszczalnia' | 'przylacze' | 'inne';
  }[];
}

// ---------- Pinezki i wpisy ----------
interface Pin extends BaseRecord {
  elementKey: string; // np. 'dom.dach.polac-pd'
  point: [number, number, number] | null; // null = cały element
  versionScope: 'wszystkie' | UUID; // pokazuj we wszystkich wersjach lub tylko w jednej
  title: string;
  layer: Layer | null; // np. pinezka zdjęcia instalacji w warstwie 'prad'
}

type EntryType =
  'notatka' | 'zdjecie' | 'link' | 'pomysl' | 'zadanie' | 'etap' | 'dokument' | 'kontakt' | 'koszt';
interface EntryBase extends BaseRecord {
  pinId: UUID;
  type: EntryType;
  title: string;
  order: number;
  tags: string[];
}
type Entry =
  | (EntryBase & { type: 'notatka'; text: string })
  | (EntryBase & { type: 'zdjecie'; mediaId: UUID; caption: string; measurements: Measurement[] })
  | (EntryBase & { type: 'link'; url: string; previewMediaId: UUID | null; note: string })
  | (EntryBase & { type: 'pomysl'; mediaIds: UUID[]; url: string | null; note: string }) // kafelek mood boardu
  | (EntryBase & {
      type: 'zadanie';
      done: boolean;
      dueDate: ISODate | null;
      assignee: string | null;
      note: string;
    })
  | (EntryBase & {
      type: 'etap';
      status: StageStatus;
      date: ISODate | null;
      contactId: UUID | null;
      note: string;
    })
  | (EntryBase & {
      type: 'dokument';
      mediaId: UUID;
      docKind: 'umowa' | 'faktura' | 'gwarancja' | 'karta-tech' | 'projekt' | 'inny';
      validUntil: ISODate | null;
    })
  | (EntryBase & { type: 'kontakt'; contactId: UUID; role: string })
  | (EntryBase & { type: 'koszt'; amount: number; currency: 'PLN'; paid: boolean; date: ISODate | null });
type StageStatus = 'planowane' | 'w-toku' | 'zrobione' | 'problem';
interface Measurement {
  label: string;
  valueCm: number;
  from: string;
} // np. {label:'gniazdo', valueCm:35, from:'narożnik lewy'}

// ---------- Globalne ----------
interface ShoppingItem extends BaseRecord {
  name: string;
  qty: number | null;
  unit: string | null;
  bought: boolean;
  shop: string | null;
  url: string | null;
  price: number | null;
  sourcePinId: UUID | null;
  sourceEntryId: UUID | null; // skąd dodano ("dodaj do listy zakupów")
}
interface Contact extends BaseRecord {
  name: string;
  trade: string;
  phone: string | null;
  email: string | null;
  note: string;
}

interface MediaFile extends BaseRecord {
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  fileName: string;
  storage: 'local' | 'cloud';
  blobKey: string;
  thumbKey: string | null; // klucze w tabeli 'blobs' lub ścieżki w Supabase Storage
}
// tabela 'blobs': { key: string; blob: Blob } — NIE synchronizowana jako rekord, tylko jako plik

// ---------- Instalacje ----------
type Layer = 'woda' | 'prad' | 'kanalizacja' | 'co' | 'wentylacja' | 'smart' | 'kamery';
interface InstallationRoute extends BaseRecord {
  versionId: UUID;
  layer: Layer;
  name: string;
  points: [number, number, number][]; // linia łamana w układzie domu
  surfaceKeys: string[]; // elementKey ścian/podłóg, po których biegnie
  note: string;
  pinId: UUID | null; // opcjonalne powiązanie ze zdjęciami
}
```

## Tabele Dexie (indeksy)

```
versions: id, isActive, updatedAt
pins:     id, elementKey, versionScope, updatedAt, deletedAt
entries:  id, pinId, type, [type+pinId], updatedAt, deletedAt
shopping: id, bought, sourcePinId, updatedAt, deletedAt
contacts: id, name, updatedAt
media:    id, updatedAt
blobs:    key
routes:   id, versionId, layer, updatedAt
meta:     key            // np. { key:'schema', value: 1 }, ustawienia
```

## Klucze elementów (`elementKey`) — NAJWAŻNIEJSZY KONTRAKT

Format: `strefa.grupa.element[-wariant]`, małe litery, bez polskich znaków, myślnik w nazwie.

- Strefy: `dom`, `wnetrze`, `dzialka`, `instalacja`.
- Przykłady: `dom.dach.polac-pn`, `dom.dach.polac-pd`, `dom.dach.kalenica`, `dom.dach.okap-pn`, `dom.dach.skrzynia-okapowa-pd`, `dom.dach.murlata`, `dom.dach.obrobki`, `dom.sciana.pn`, `dom.sciana.szczyt-wsch`, `dom.okno.o3`, `dom.drzwi.wejsciowe`, `dom.taras.t1`, `dom.komin.k1`, `dom.fundament`, `wnetrze.p0.salon`, `wnetrze.p1.sypialnia-1`, `wnetrze.p0.sciana.salon-pn`, `dzialka.drzewo.d4`, `dzialka.strefa.podjazd`, `dzialka.teren`.
- Klucze z `HouseSpec` (`openings[].key`, `rooms[].key`…) wchodzą do elementKey: `dom.okno.<key>`, `wnetrze.p<floor>.<room.key>`.
- **Nigdy** nie generuj kluczy z indeksu tablicy ani losowo — tylko z nazw/kluczy w spec.
- Prefiksy pozwalają na zapytania grupowe: „wszystko o dachu” = `elementKeyPrefix: 'dom.dach'`.
- Rejestr i walidacja: `src/core/elementKeys.ts` (`isValidKey`, `parentOf`, `labelFor(key) → 'Połać południowa'`).

## Wersjonowanie modelu

- Wersja = kopia `HouseSpec`. Pinezki nie należą do wersji — wiążą się kluczem.
- Pinezka z `versionScope: 'wszystkie'` pokazuje się w każdej wersji, w której istnieje jej element.
- Element nieistniejący w aktywnej wersji → pinezka „osierocona”: widoczna w listach z oznaczeniem, nie znika.
- Instalacje (`InstallationRoute`) należą do konkretnej wersji (zwykle „stan”), bo opisują to, co fizycznie jest w ścianach.

## Gotowość pod chmurę (faza 4)

- Każda tabela (oprócz `blobs`, `meta`) ↔ tabela Postgres o tych samych polach (camelCase → snake_case w adapterze).
- Synchronizacja: „ostatni zapis wygrywa” po `updatedAt` na poziomie rekordu (Z-5); `deletedAt` propaguje usunięcia.
- Dodatkowe pole w chmurze: `household_id` (wspólne dla Damiana i żony) — lokalnie zbędne.

## Kopia zapasowa (format)

Plik `.zip`: `data.json` (`{ schemaVersion, exportedAt, tables: {...} }`) + folder `blobs/<key>`. Import: scalanie po `id` z `updatedAt` (nowszy wygrywa) lub pełne zastąpienie (wybór użytkownika).
