# T09 — Widoki zbiorcze: tablica (mood board), zadania, filtry
**Moduł:** M8 · **Faza:** 1 · **Zależy od:** T06, T07 · **Odblokowuje:** T10

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; wpisy (notatki, zdjęcia, pomysły, zadania, etapy) są przypięte do elementów modelu 3D. Poza modelem potrzebne są widoki „wszystko w jednym miejscu”: tablica kafelków w stylu Pinterest oraz lista zadań. Każdy kafelek prowadzi z powrotem do elementu w 3D.

## Cel
Widoki **Tablica** i **Zadania** z filtrami i wyszukiwaniem.

## Przeczytaj
`03` sekcje „Pinezki i wpisy”, „Klucze elementów” (prefiksy). Raporty T02 (`queryEntries`), T06 (edytory wpisów — użyj ich ponownie), T07 (`PhotoGrid`).

## Pliki (wolno)
`src/features/board/**`, `src/features/tasks/**`, `src/ui/FilterBar.tsx`.

## Nie ruszaj
`src/data` (poza zgłoszeniem potrzebnych zapytań), `src/features/pins` (tylko import komponentów).

## Do zrobienia
1. Tablica: układ „masonry” kafelków (zdjęcia, pomysły, notatki, linki); kafelek: miniatura, tytuł, ścieżka elementu.
2. Filtry: typ wpisu, strefa/grupa elementu (prefiks: Dach, Ściany, Wnętrze, Działka…), tagi, tekst.
3. Zadania: lista z grupowaniem wg elementu lub terminu; odhaczanie bezpośrednio z listy; „zaległe” na czerwono.
4. Klik w kafelek/zadanie → szczegóły; przycisk „Pokaż w modelu” zaznacza element.
5. Stan filtrów w URL (do linkowania).

## Kryteria akceptacji
- K1 Filtr „Dach + pomysły” pokazuje wyłącznie pomysły z `dom.dach.*` (test).
- K2 Odhaczenie zadania na liście aktualizuje panel pinezki.
- K3 Tablica płynna przy 500 kafelkach (leniwe ładowanie miniatur).
