# T13 — Wersje modelu: stan aktualny vs wizja
**Moduł:** M11 · **Faza:** 2 · **Zależy od:** T04, T06 · **Odblokowuje:** T14

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; model 3D powstaje z `HouseSpec` zapisanego w `ModelVersion`. Damian chce mieć „stan aktualny” (to, co stoi) i „wizję” (docelowy dom, np. z innym tarasem), a pinezki mają zostać przy elementach niezależnie od wersji (D-003). Zmiany w bazie modelu będą się zdarzać przez całą budowę.

## Cel
Tworzenie, przełączanie, porównywanie wersji; prosty edytor parametrów; obsługa pinezek osieroconych.

## Przeczytaj
**`07-wytyczne-modelu-i-renderu.md` (obowiązkowo — fakty ze zdjęć i lista zdjęć do Twoich elementów).** `03` sekcje `ModelVersion`, „Wersjonowanie modelu”. `04` wiersze o `elementKey` i `HouseSpec`. Raport T06.

## Pliki (wolno)
`src/features/settings/versions/**`, `src/data/repos/versions.ts` (rozbudowa), `src/state/viewStore.ts` (`activeVersionId` — już jest), `src/features/pins/*` (tylko oznaczenie osieroconych i `versionScope`).

## Nie ruszaj
Generatora i `HouseSpec` (edytor zmienia wartości, nie strukturę).

## Do zrobienia
1. Przełącznik wersji w widoku Model (np. „Stan aktualny ▾”).
2. „Utwórz wersję na podstawie…” (kopiuje spec, `basedOnId`).
3. Edytor parametrów (formularz): wymiary, kąt dachu, okna (dodaj/usuń/przesuń), taras — z podglądem na żywo.
4. Porównanie: tryb „różnice” — elementy dodane (zielone), usunięte (czerwone, półprzezroczyste), zmienione (żółte).
5. Pinezki osierocone: lista w Ustawieniach + oznaczenie w widokach; możliwość „przepnij do innego elementu” (zmiana `elementKey` jednej pinezki).
6. Przy tworzeniu pinezki opcja „tylko w tej wersji” (`versionScope`).

## Kryteria akceptacji
- K1 Pinezka na tarasie pozostaje po zmianie wymiarów tarasu w nowej wersji (test).
- K2 Usunięcie okna w wizji → pinezka okna widoczna jako osierocona w wizji, normalnie w stanie aktualnym.
- K3 Dokładnie jedna wersja aktywna (test).
