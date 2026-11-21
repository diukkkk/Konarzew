# T04 — Generator bryły domu z HouseSpec
**Moduł:** M3 · **Faza:** 1 · **Zależy od:** T02, T03 · **Odblokowuje:** T05, T06, T11, T12, T13

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu typu „stodoła” (projekt „Stodoła S+ Exclusive”, stan surowy zamknięty). Model 3D nie jest rysowany ręcznie — powstaje z pliku z liczbami (`HouseSpec`), a każda część dostaje stały klucz `elementKey`, do którego użytkownicy przypinają notatki. Stabilność kluczy jest ważniejsza niż detale geometrii.

## Cel
Czyste funkcje `buildHouse(spec) → BuiltElement[]` tworzące bryłę stodoły (ściany, szczyty, połacie dachu, kalenica, okapy, skrzynie okapowe, murłata, obróbki, okna/drzwi, taras, komin, fundament) + plik spec z wartościami tymczasowymi.

## Przeczytaj
`03-model-danych.md` sekcje `HouseSpec`, „Klucze elementów”. `02` sekcja „Publiczne API” (`src/model3d`). Raport T03 („Dla następnych”: API `ElementMesh`).

## Pliki (wolno)
`src/model3d/house/*` (oprócz `interior.ts`), `src/model3d/types.ts` (`BuiltElement`), `src/model3d/specs/house.default.json`, `src/scene/HouseView.tsx`, `src/core/elementKeys.ts` (tylko dopisanie etykiet).

## Nie ruszaj
`src/core/types.ts` (zmiana `HouseSpec` = wpis DECYZJE + uzgodnienie), `src/data`.

## Do zrobienia
1. `BuiltElement = { elementKey, category: 'sciana'|'dach'|'okap'|'konstrukcja'|'otwor'|'taras'|'komin'|'fundament', geometry: BufferGeometry-data lub parametry prymitywu, position, rotation, color? }` — bez Reacta.
2. Ściany z otworami (okna/drzwi jako wycięcia lub osobne „ramki” — wybierz prostsze, zapisz w DECYZJE). Szczyty trójkątne wg `pitchDeg`.
3. Dach dwuspadowy: 2 połacie (`dom.dach.polac-pn`, `-pd`) z okapem `overhangEaves`; kalenica; skrzynie okapowe (`dom.dach.skrzynia-okapowa-pn/-pd`) jako cienkie bryły pod okapem; murłata (`dom.dach.murlata`) widoczna w trybie „bez dachu” (domyślnie ukryta — flaga `hiddenByDefault`); obróbki blacharskie (`dom.dach.obrobki`) jako obrys krawędzi.
4. Okna/drzwi z `openings[]` → `dom.okno.<key>`, `dom.drzwi.<key>`; świetliki na połaciach.
5. Taras, komin, fundament (cokół).
6. `house.default.json` z wartościami **tymczasowymi** (każda opatrzona w `extras.assumptions` opisem „ZAŁOŻENIE: do zastąpienia w T05”). Nie podawaj ich jako wymiarów projektu.
7. `HouseView.tsx`: pobiera aktywną wersję (`useActiveVersion`), wywołuje `buildHouse`, renderuje `ElementMesh` (memoizacja).

## Kryteria akceptacji
- K1 Testy: ten sam spec → te same klucze w tej samej kolejności; zmiana wymiarów nie zmienia zestawu kluczy.
- K2 Testy: każdy klucz przechodzi `isValidKey` i ma etykietę `labelFor` ≠ klucz.
- K3 Wszystkie elementy z punktu 3–5 widoczne i klikalne (Playwright klika połać i skrzynię okapową).
- K4 Zmiana `pitchDeg` w spec zmienia nachylenie dachu bez innych zmian w kodzie.
- K5 Generator działa <50 ms dla domyślnego spec (test).

## Raport
Wg `06`. W „Dla następnych”: pełna lista wygenerowanych kluczy.
