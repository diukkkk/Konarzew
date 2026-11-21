# T11 — Działka: mapka w skali, posadowienie, drzewa, strefy
**Moduł:** M9 · **Faza:** 2 · **Zależy od:** T04, T07 · **Odblokowuje:** pinezki na działce, T14 (przyłącza)

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu z rysunkowym modelem 3D; dom ma stać na działce w prawdziwej skali. Damian ma mapkę działki, zdjęcia satelitarne (drzewa) i zdjęcia do skali. Działka też ma klikalne elementy (strefy, drzewa) z pinezkami — np. zadania na podwórku.

## Cel
Podłoże z mapką/satelitą w skali, obrys działki, ustawienie i obrót domu, drzewa i strefy jako klikalne elementy `dzialka.*`.

## Przeczytaj
**`07-wytyczne-modelu-i-renderu.md` (obowiązkowo — fakty ze zdjęć i lista zdjęć do Twoich elementów).** `03` sekcja `PlotSpec`, „Klucze elementów” (`dzialka.*`). Raporty T04 (`BuiltElement`), T07 (`saveMedia`).

## Wejścia
`/mnt/project-files/materialy/dzialka/` (mapka z wrysowanym domem) i `materialy/WYMIARY.md` (działka ok. 4800 m²).

## Pliki (wolno)
`src/model3d/plot/**`, `src/scene/PlotView.tsx`, `src/features/settings/PlotEditor.tsx`, `src/core/elementKeys.ts` (etykiety).

## Nie ruszaj
`src/model3d/house/**`; struktury `PlotSpec` bez wpisu DECYZJE.

## Do zrobienia
1. Edytor działki (Ustawienia → Działka): wgraj obraz → kalibracja skali (kliknij 2 punkty, wpisz odległość w m) → obrysuj granicę działki.
2. Posadowienie domu: przeciągnij i obróć bryłę na mapce (zapis `housePosition`).
3. Drzewa: kliknij na mapce → drzewo (średnica korony, wysokość) — styl rysunkowy (stożek/kula na pniu).
4. Strefy: wielokąty (podjazd, ogród, trawnik, oczyszczalnia, przyłącze…), płaskie kolory.
5. Teren `dzialka.teren` z mapką jako teksturą (przełącznik: mapka / płaski kolor).
6. Zapis w `spec.plot` aktywnej wersji (przez `versions.updateVersionSpec`).

## Kryteria akceptacji
- K1 Odległość zmierzona w aplikacji między dwoma punktami mapki zgadza się z mapką (±2%).
- K2 Drzewa i strefy klikalne, pinezki działają jak na domu.
- K3 Dom pozostaje we właściwym miejscu po odświeżeniu.
