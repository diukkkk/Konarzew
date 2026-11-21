# T08 — Lista zakupów
**Moduł:** M7 · **Faza:** 1 · **Zależy od:** T02 · **Odblokowuje:** T10

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; do elementów modelu przypina się pinezki z wpisami. Jedna wspólna, prosta lista zakupów dla Damiana i żony (D-005), do której można dodać pozycję z dowolnej pinezki. Pozycja pamięta, skąd pochodzi.

## Cel
Widok „Zakupy” + przycisk „Dodaj do listy zakupów” używany w panelu pinezki.

## Przeczytaj
`03` sekcja `ShoppingItem`. Raport T02 (API `shopping`).

## Pliki (wolno)
`src/features/shopping/**`, eksport komponentu `AddToShoppingButton` (props: `{pinId?, entryId?, defaultName?}`), `src/i18n/pl.ts`.

## Nie ruszaj
`src/features/pins` — T06 osadza Twój przycisk; jeśli T06 już zrobione, dodaj przycisk w menu „Dodaj” jako jedyną zmianę tam i opisz w raporcie.

## Do zrobienia
1. Lista: szybkie dodawanie (pole + Enter), odhaczanie (kupione na dół, przekreślone), edycja: ilość, jednostka, sklep, link, cena.
2. Filtry: do kupienia / kupione / wszystkie; grupowanie wg sklepu (opcjonalnie).
3. Przy pozycji z `sourcePinId`: etykieta „z: Dach › Połać południowa” — klik przenosi do modelu i zaznacza element.
4. „Kopiuj listę” jako tekst (do wysłania SMS-em).
5. Suma cen pozycji do kupienia.

## Kryteria akceptacji
- K1 Playwright: dodaj z pinezki → widać na liście z etykietą źródła → klik przenosi do elementu.
- K2 Odhaczenie i odświeżenie strony zachowuje stan.
- K3 Wygodne na telefonie (duże pola, jednym kciukiem).
