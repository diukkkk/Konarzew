# 02 — Architektura i technologie

## Wersja dla Damiana (bez żargonu)
Aplikacja to strona internetowa, którą otwierasz w przeglądarce. Na początku wszystko zapisuje się w pamięci przeglądarki na Twoim komputerze (bez logowania). Model domu nie jest rysowany ręcznie w programie 3D — jest **budowany automatycznie z liczb** (długość, szerokość, kąt dachu, położenie okien) zapisanych w jednym pliku. Dzięki temu poprawka w rzucie to zmiana liczby, a nie przerysowanie modelu. Później dołożymy konta i chmurę, żeby żona widziała to samo na telefonie — dane od początku są tak zaprojektowane, żeby to było proste.

## Stos technologiczny (z uzasadnieniem)
| Obszar | Wybór | Dlaczego |
|---|---|---|
| Język | TypeScript | Typy łapią błędy agentów; kontrakty między modułami są sprawdzane automatycznie |
| Budowanie | Vite | Standard, szybki, prosta konfiguracja |
| UI | React 19 | Najwięcej przykładów i bibliotek, agenci znają go najlepiej |
| 3D | three.js + @react-three/fiber + @react-three/drei | Najpopularniejszy silnik 3D w przeglądarce; drei daje gotowe: kamera orbitalna, obrysy, klikanie |
| Styl 3D | `MeshToonMaterial` + `Outlines`/`Edges` z drei, płaskie kolory | Rysunkowy wygląd bez tekstur |
| Stan aplikacji | Zustand | Prosty, mało kodu, łatwy dla agentów |
| Baza lokalna | IndexedDB przez Dexie.js (+ `dexie-react-hooks`) | Przechowuje dane i zdjęcia (Blob) w przeglądarce; wersjonowane migracje |
| Zdjęcia | `browser-image-compression` (miniatury + kompresja) | Zdjęcia z telefonu są duże; trzymamy oryginał zmniejszony do ~2560 px + miniaturę 400 px |
| Style UI | Tailwind CSS + prosty zestaw własnych komponentów | Szybkie, spójne, responsywne (telefon/tablet) |
| Routing | React Router | Widoki: Model, Tablica (mood board), Zadania, Zakupy, Oś czasu, Ustawienia |
| Testy | Vitest (logika), Playwright (scenariusze w przeglądarce) | Kryteria akceptacji w kartach zadań mają być sprawdzalne |
| Hosting | Statyczny: GitHub Pages lub Netlify (Z-3) | Darmowy, bez serwera w fazach 1–3 |
| Chmura (faza 4) | Supabase (Postgres + logowanie + przechowywanie plików) | Darmowy plan wystarcza dla 2 osób; model danych od początku zgodny (UUID, `updatedAt`, `deletedAt`) |
| PWA | `vite-plugin-pwa` | Ikona na telefonie, pełny ekran |

Wersje bibliotek ustala T01 i zapisuje w `DECYZJE.md`. Nie dodawaj nowych bibliotek bez wpisu w `DECYZJE.md`.

## Zasady architektoniczne
1. **Model 3D jest generowany z danych** (`HouseSpec` JSON), nie z pliku .glb. Generator nadaje każdej siatce stały `elementKey`.
2. **Pinezki przypinają się do `elementKey`, nie do siatki 3D.** Zmiana geometrii nie gubi pinezek. Zmiana/usunięcie klucza = migracja (patrz 04).
3. **Warstwa danych jest jedynym miejscem dostępu do bazy.** UI i 3D nie importują Dexie bezpośrednio — tylko funkcje z `src/data/`.
4. **Każdy rekord jest gotowy do synchronizacji**: `id` (UUID), `createdAt`, `updatedAt`, `deletedAt` (miękkie usuwanie), `createdBy`.
5. **Pliki (zdjęcia, PDF) są oddzielone od danych**: rekord `MediaFile` + Blob w osobnej tabeli. W chmurze Blob → Supabase Storage.
6. **Moduły funkcji nie importują się nawzajem** — komunikują się przez `src/core` (typy) i `src/data` (repozytoria) oraz wspólny stan zaznaczenia (`selectionStore`).
7. Interfejs w całości po polsku; teksty w `src/i18n/pl.ts` (łatwiej poprawiać).

## Struktura folderów (docelowa)
```
src/
  core/                 # KONTRAKTY — zmiany tylko z wpisem w DECYZJE.md
    types.ts            # wszystkie typy z 03-model-danych.md
    elementKeys.ts      # rejestr i reguły kluczy elementów
    ids.ts              # newId(), now()
  data/                 # jedyny dostęp do bazy (Dexie)
    db.ts               # schemat + migracje
    repos/              # pins.ts, entries.ts, shopping.ts, media.ts, versions.ts, contacts.ts, routes.ts
    backup.ts           # eksport/import
    sync/               # (faza 4) adapter Supabase
  model3d/              # generator geometrii z HouseSpec (czyste funkcje, bez React)
    house/              # walls.ts, roof.ts, openings.ts, terrace.ts, interior.ts
    plot/               # teren, drzewa, strefy
    installations/      # geometria tras
    specs/              # house.default.json (dane z rzutów)
  scene/                # React-three-fiber: Canvas, kamera, światło, styl, klikanie
    Scene.tsx, HouseView.tsx, PlotView.tsx, LayerView.tsx, PinMarkers.tsx
  state/                # Zustand: selectionStore, viewStore (warstwy, wersja, tryb wnętrza)
  features/             # widoki/panele funkcji
    pins/               # panel pinezki + edytory wpisów
    board/              # tablica kafelków (mood board)
    tasks/              # lista zadań
    shopping/           # lista zakupów
    timeline/           # oś czasu, etapy
    documents/          # dokumenty, kontakty
    settings/           # backup, wersje modelu
  ui/                   # wspólne komponenty (Button, Sheet, Modal, PhotoGrid…)
  i18n/pl.ts
  App.tsx, main.tsx, routes.tsx
docs/plan/              # kopia tego planu w repo
tests/e2e/              # Playwright
```

## Publiczne API modułów (kontrakty — skrót; pełne typy w 03)
**`src/data/repos/*`** — każda funkcja asynchroniczna, zwraca typy z `core/types.ts`:
- `pins`: `createPin(input)`, `updatePin(id, patch)`, `deletePin(id)`, `listPinsByElement(elementKey)`, `listAllPins()`
- `entries`: `createEntry(input)`, `updateEntry(id, patch)`, `deleteEntry(id)`, `listEntriesByPin(pinId)`, `queryEntries({type?, elementKeyPrefix?, status?, text?})`
- `shopping`: `addShoppingItem(input)`, `toggleBought(id)`, `updateShoppingItem(id, patch)`, `deleteShoppingItem(id)`, `listShopping({bought?})`
- `media`: `saveMedia(file: File) → MediaFile`, `getMediaUrl(id, 'thumb'|'full')`, `deleteMedia(id)`
- `versions`: `listVersions()`, `getActiveVersion()`, `createVersion(from, name, kind)`, `updateVersionSpec(id, spec)`, `setActiveVersion(id)`
- `contacts`, `routes`: CRUD analogicznie
- Hooki React (reaktywne): `useLiveQuery` z Dexie opakowane w `src/data/hooks.ts` (`usePins(elementKey)`, `useEntries(pinId)`, `useShopping()` …)

**`src/model3d`**: `buildHouse(spec: HouseSpec, opts) → BuiltElement[]` (czyste dane geometrii + `elementKey` + `category`), `buildPlot(plotSpec) → BuiltElement[]`. Bez Reacta, testowalne.

**`src/state/selectionStore`**: `{ selectedElementKey, selectedPinId, hoveredElementKey, select(key, point?), clear() }`.

**`src/state/viewStore`**: `{ activeVersionId, visibleLayers: Layer[], interiorMode: 'zewnatrz'|'bez-dachu'|'pietro-0'|'pietro-1', toggleLayer() }`.

## Przepływ kliknięcia (przykład)
Kliknięcie dachu → `scene` odczytuje `userData.elementKey` siatki → `selectionStore.select('dom.dach.polac-pd', punkt)` → `features/pins` pokazuje panel → `usePins(key)` → użytkownik dodaje wpis → `entries.createEntry()` → Dexie → hooki odświeżają panel i znaczniki pinezek w 3D.
