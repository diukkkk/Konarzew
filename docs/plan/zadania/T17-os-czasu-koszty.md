# T17 — Oś czasu budowy i koszty
**Moduł:** M13 · **Faza:** 3 · **Zależy od:** T06, T16

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; przy elementach zapisywane są etapy (planowane / w toku / zrobione / problem) z datami i wykonawcami. Damian chce widzieć przebieg budowy na osi czasu i (opcjonalnie) koszty. Koszty to wpis `koszt`; widoczność dla obojga — P-4.

## Cel
Widok „Oś czasu” z etapów i dat oraz podsumowanie kosztów per element/grupa.

## Przeczytaj
`03` wpisy `etap`, `koszt`. `DECYZJE` P-4. Raporty T06, T16.

## Pliki (wolno)
`src/features/timeline/**`, `src/features/costs/**`, `src/features/pins/editors/CostEditor.tsx`.

## Do zrobienia
1. Oś czasu: etapy chronologicznie (miesiące), kolor wg statusu, wykonawca, klik → element w 3D.
2. „Co dalej”: etapy planowane najbliższe w czasie.
3. Animacja „postęp budowy” w 3D (opcjonalnie): suwak daty koloruje elementy wg statusu na dany dzień.
4. Koszty: edytor kwoty; sumy per grupa (`dom.dach`…), zapłacone/niezapłacone; eksport CSV.
5. Przełącznik „ukryj kwoty” (do czasu odpowiedzi P-4).

## Kryteria akceptacji
- K1 Etap z datą pojawia się na osi we właściwym miesiącu.
- K2 Sumy kosztów zgodne z wpisami (test).
