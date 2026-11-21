# T12 — Wnętrze: pokoje, piętra, przekrój
**Moduł:** M10 · **Faza:** 2 · **Zależy od:** T04, T05 · **Odblokowuje:** T14

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu z rysunkowym modelem 3D generowanym z `HouseSpec`. Użytkownicy chcą przypinać pomysły i zadania do pokoi oraz do konkretnych ścian wewnętrznych (później: trasy instalacji). Wnętrze ma być czytelne, nie realistyczne.

## Cel
Pomieszczenia i ściany wewnętrzne z `spec.rooms`, tryby widoku: zewnątrz / bez dachu / parter / poddasze.

## Przeczytaj
**`07-wytyczne-modelu-i-renderu.md` (obowiązkowo — fakty ze zdjęć i lista zdjęć do Twoich elementów).** `03` sekcje `Room`, „Klucze elementów” (`wnetrze.*`). `02` `viewStore.interiorMode`. Raporty T04, T05.

## Pliki (wolno)
`src/model3d/house/interior.ts`, `src/scene/HouseView.tsx` (tylko obsługa trybów), `src/scene/ViewModeToolbar.tsx`, `src/model3d/specs/house.default.json` (sekcja `rooms`), `src/core/elementKeys.ts` (etykiety).

## Nie ruszaj
Pozostałe pliki generatora — chyba że ukrywanie dachu wymaga flagi (zgłoś).

## Do zrobienia
1. `buildInterior(spec)`: podłoga pokoju `wnetrze.p<floor>.<room.key>` (kolor wg typu), ściany działowe `wnetrze.p<floor>.sciana.<room.key>-<strona>`, wewnętrzne strony ścian zewnętrznych.
2. Tryby: „bez dachu” chowa dach, murłata widoczna; „parter” — przekrój na wysokości ~1,2 m, poddasze ukryte; „poddasze” — parter wyszarzony.
3. Nazwy pokoi jako etykiety (drei `Html`/`Text`), wyłączane.
4. Pokoje z rzutów (jeśli T05 ich nie wprowadził — wprowadź na podstawie `materialy/`, oznaczając źródła).

## Kryteria akceptacji
- K1 Klik w podłogę pokoju i ścianę działową otwiera panel z poprawną etykietą.
- K2 Przełączanie trybów < 200 ms, bez przebudowy całej geometrii.
- K3 Klucze stabilne przy zmianie wymiarów pokoi (test).
