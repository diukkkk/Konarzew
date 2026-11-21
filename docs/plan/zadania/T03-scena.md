# T03 — Scena 3D i styl rysunkowy

**Moduł:** M4 · **Faza:** 1 · **Zależy od:** T01 · **Odblokowuje:** T04, T06

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do prowadzenia budowy domu; centrum to model 3D domu na działce, w którym elementy są klikalne. Styl: prosta, rysunkowa bryła, płaskie kolory, ostre krawędzie z obrysem — jak klasyczne gry strategiczne w rzucie izometrycznym, ale ostrzej; bez fotorealizmu. Model będzie generowany z danych (T04), tu budujesz „scenę”, która wyświetli dowolny zestaw elementów.

## Cel

Komponent sceny: Canvas, kamera, światło, styl, teren, obsługa najechania/kliknięcia elementów przez `userData.elementKey`, store zaznaczenia i widoku.

## Przeczytaj

`02-architektura.md` sekcje „Struktura folderów”, „Publiczne API” (`selectionStore`, `viewStore`), „Przepływ kliknięcia”. `03` sekcja „Klucze elementów” (tylko format).

## Pliki (wolno)

`src/scene/**`, `src/state/selectionStore.ts`, `src/state/viewStore.ts`, widok Model w `src/features/model/ModelPage.tsx` (osadzenie sceny).

## Nie ruszaj

`src/core`, `src/data`, `src/model3d` (używaj lokalnych brył testowych, np. 3 pudełek z kluczami `dom.sciana.pn`, `dom.dach.polac-pd`, `dom.taras.t1`).

## Do zrobienia

1. `Scene.tsx`: `<Canvas>` z kamerą perspektywiczną o wąskim kącie (efekt quasi-izometryczny) lub ortograficzną (wybierz, zapisz w DECYZJE), `OrbitControls` (obrót, zoom, przesuwanie; dotyk na telefonie), ograniczenie, by nie wejść pod teren.
2. Styl: `MeshToonMaterial` z 3–4 stopniowym gradientem, `Edges`/`Outlines` (ciemny obrys), światło kierunkowe „słońce” + ambient, miękkie cienie (opcjonalnie wyłączane na telefonie).
3. Paleta kolorów w `scene/palette.ts` (ściany, dach, drewno, teren, woda, prąd…).
4. Komponent `ElementMesh` przyjmuje `{elementKey, geometry, category, position, rotation}`; hover = rozjaśnienie, zaznaczony = kolor akcentu + grubszy obrys.
5. Klik → `selectionStore.select(elementKey, point)`; klik w puste → `clear()`. Rozróżnij przeciągnięcie od kliknięcia (próg ~5 px).
6. `PinMarkers.tsx`: przyjmuje listę `{elementKey|point, count}` i rysuje małe znaczniki (na razie z danych testowych).
7. Przyciski widoku: „Wyśrodkuj”, „Z góry”, „Izometria”.
8. Wydajność: działa płynnie na telefonie (cel ≥30 fps przy ~300 elementach).

## Kryteria akceptacji

- K1 Na stronie Model widać 3 testowe bryły w stylu rysunkowym z obrysem.
- K2 Klik w bryłę → w panelu (tymczasowo) pokazuje się jej `elementKey`; test Playwright.
- K3 Obrót/zoom działa myszą i dotykiem (ręczna weryfikacja na emulacji telefonu, zrzut ekranu w raporcie).
- K4 `selectionStore`, `viewStore` mają API zgodne z 02 (test jednostkowy).
- K5 Scena nie importuje `dexie` ani `src/data` bezpośrednio (dane przychodzą przez propsy/hooki).

## Raport

Wg `06`. Dołącz zrzut ekranu.
