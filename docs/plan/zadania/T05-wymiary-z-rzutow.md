# T05 — Wymiary z rzutów → house.default.json
**Moduł:** M3 (dane) · **Faza:** 1 · **Zależy od:** T04, materiały od Damiana (P-2, P-3) · **Odblokowuje:** T10, T12

## Kontekst w 3 zdaniach
Aplikacja do budowy domu „Stodoła S+ Exclusive” generuje model 3D z pliku liczb `house.default.json`. Do tej pory plik ma wartości tymczasowe. Damian ma rzuty z drobnymi zmianami względem projektu — trzeba je przenieść do pliku.

## Cel
Prawdziwe wymiary domu w `house.default.json` (obrys, grubość ścian, wysokości, dach, okna/drzwi, taras, komin; pokoje jeśli łatwo odczytać — dla T12).

## Przeczytaj
`03` sekcja `HouseSpec` (układ współrzędnych!). Raport T04 (lista kluczy).

## Wejścia
`/mnt/project-files/materialy/WYMIARY.md` (zacznij od niego — podsumowanie wymiarów) oraz `materialy/rzuty/`, `materialy/zdjecia/`; lista zmian od Damiana (P-3). Kierunek wizji (cegła + deska opalana): `materialy/wizja/`.

## Pliki (wolno)
`src/model3d/specs/house.default.json`, `docs/plan/` (notatka z odczytem), `DECYZJE.md`.

## Nie ruszaj
Kod generatora (jeśli czegoś brakuje w `HouseSpec`, zgłoś w raporcie jako zadanie dla T04/T12, nie dopisuj kodu).

## Do zrobienia
1. Odczytaj wymiary z rzutów; każdą wartość opisz źródłem (`extras.sources`: „rzut parteru, wymiar 12,45”).
2. Zmiany Damiana nanieś i oznacz (`extras.changesFromCatalog`).
3. Wartości nieczytelne: zostaw tymczasowe, oznacz, dodaj pytanie P- do DECYZJE.
4. Klucze okien: nazwy czytelne i stabilne (`o-salon-1`, `o-kuchnia`…), uzgodnione z numeracją w projekcie, jeśli jest.
5. Porównaj wizualnie model z elewacjami (zrzuty ekranu obok siebie w raporcie).

## Kryteria akceptacji
- K1 Każde pole liczbowe ma źródło lub flagę „ZAŁOŻENIE”.
- K2 Wymiary obrysu i wysokość kalenicy zgodne z projektem (±5 cm).
- K3 Wszystkie okna i drzwi z elewacji obecne.
- K4 Damian potwierdza w wątku, że model „wygląda jak nasz dom” (lista różnic w raporcie).
