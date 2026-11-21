# T06 — Klikanie elementów + panel pinezki + wpisy tekstowe
**Moduł:** M5 · **Faza:** 1 · **Zależy od:** T02, T04 · **Odblokowuje:** T09, T13, T16, T17

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu: użytkownik klika element modelu 3D (np. połać dachu) i przypina do niego „pinezkę” z wpisami. To serce aplikacji — ma być proste dla osoby nietechnicznej na telefonie. Pinezki wiążą się z `elementKey`, nie z geometrią.

## Cel
Panel elementu: lista pinezek elementu, tworzenie pinezki (cały element lub konkretny punkt), wpisy: **notatka, link, zadanie, status etapu** (zdjęcia i pomysły dochodzą w T07, zakupy w T08 — przygotuj miejsce w menu „Dodaj”).

## Przeczytaj
`03` sekcje „Pinezki i wpisy”, „Klucze elementów”. `02` „Przepływ kliknięcia”. Raporty T02 (API) i T03 (`selectionStore`, `PinMarkers`).

## Pliki (wolno)
`src/features/pins/**`, `src/features/model/ModelPage.tsx`, `src/scene/PinMarkers.tsx` (podłączenie do danych), `src/i18n/pl.ts`.

## Nie ruszaj
`src/core`, `src/data` (zgłaszaj brakujące funkcje w raporcie; drobne dopisanie zapytania dozwolone z wpisem w DECYZJE), `src/model3d`.

## Do zrobienia
1. Po kliknięciu elementu: panel (`ui/Sheet`) z nagłówkiem `labelFor(key)` i ścieżką („Dach › Połać południowa”), listą pinezek i przyciskiem „+ Pinezka”.
2. Tryb „przypnij w punkcie”: po wybraniu, następny klik na elemencie zapisuje `point`.
3. Pinezka: tytuł, lista wpisów (kafelki), przycisk „Dodaj” z typami. Edytory: notatka (tekst wielolinijkowy), link (URL + opis, otwiera w nowej karcie), zadanie (checkbox, termin, kto), etap (status: planowane/w toku/zrobione/problem, data, notatka).
4. Status etapu widoczny w 3D: element z etapem „zrobione” ma mały zielony znaczek, „problem” — czerwony (przez `PinMarkers`).
5. Znaczniki pinezek z prawdziwych danych (`usePinCountsByElement`, pinezki punktowe w swoim punkcie); klik w znacznik otwiera pinezkę.
6. Edycja/usuwanie (z potwierdzeniem) pinezek i wpisów; sortowanie wpisów przeciąganiem (pole `order`) — opcjonalnie.
7. Element nadrzędny: w panelu „Dach” widać też pinezki z `dom.dach.*` (zwijane według dziecka).

## Kryteria akceptacji
- K1 Playwright: klik połać → dodaj pinezkę → dodaj notatkę, link, zadanie, etap → odśwież stronę → wszystko jest.
- K2 Pinezka punktowa pokazuje się w miejscu kliknięcia.
- K3 Etap „zrobione” zmienia znaczek na elemencie.
- K4 Na 390 px panel jest wygodny (pełna wysokość, duże przyciski ≥44 px).
- K5 Usunięcie pinezki ukrywa jej wpisy (miękkie usunięcie).
