# T02 — Kontrakty i warstwa danych + kopia zapasowa

**Moduły:** M1, M2 · **Faza:** 1 · **Zależy od:** T01 · **Odblokowuje:** T04, T06, T07, T08 (i pośrednio wszystko)

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do prowadzenia budowy domu: model 3D, klik w element → pinezka z wpisami (notatki, zdjęcia, zadania…), globalna lista zakupów. Faza 1 = dane lokalnie w IndexedDB, faza 4 = synchronizacja z Supabase, więc rekordy już teraz muszą być „gotowe do chmury”. To zadanie tworzy kontrakty, na których stoją wszystkie pozostałe moduły — dokładność ważniejsza niż szybkość.

## Cel

Typy, klucze elementów i jedyna warstwa dostępu do danych (repozytoria + hooki React) oraz eksport/import kopii zapasowej.

## Przeczytaj

`03-model-danych.md` (całość), `02-architektura.md` sekcje „Zasady architektoniczne” i „Publiczne API modułów”, `04` tabela „Co się psuje”.

## Pliki (wolno)

`src/core/types.ts`, `src/core/elementKeys.ts`, `src/core/ids.ts`, `src/data/**` (oprócz `sync/`), testy `src/**/*.test.ts`, widok `src/features/settings/Backup.tsx` (tylko przyciski eksport/import).

## Nie ruszaj

`src/scene`, `src/model3d`, inne `features/*`.

## Do zrobienia

1. `core/types.ts` — dokładnie typy z 03 (dozwolone drobne poprawki z wpisem w DECYZJE).
2. `core/elementKeys.ts` — `isValidKey`, `parentOf`, `startsWithPrefix`, `labelFor(key)` z mapą etykiet PL dla przykładów z 03 i reguł generycznych (np. `dom.okno.o3` → „Okno o3”).
3. `core/ids.ts` — `newId()`, `now()`; funkcja `newRecord<T>(fields)` wypełniająca pola `BaseRecord`.
4. `data/db.ts` — Dexie, tabele i indeksy z 03, `version(1)`; przy pierwszym uruchomieniu tworzy wersję modelu „Stan aktualny” (`isActive: true`) z `spec` = import z `src/model3d/specs/house.default.json` jeśli istnieje, inaczej minimalny spec tymczasowy (oznacz ZAŁOŻENIE).
5. `data/repos/*` — API z 02 (pins, entries, shopping, media [tylko zapis/odczyt Blob; kompresja w T07], versions, contacts, routes). Wszystkie aktualizują `updatedAt`; usuwanie = `deletedAt`; usunięcie pinezki usuwa miękko jej wpisy.
6. `data/hooks.ts` — `usePins(elementKey)`, `usePinCountsByElement()` (do znaczników w 3D), `useEntries(pinId)`, `useEntriesQuery(q)`, `useShopping(filter)`, `useActiveVersion()`, `useVersions()`.
7. `data/migrateElementKeys(map)` — przepisanie kluczy w pins (na przyszłość, z testem).
8. `data/backup.ts` — eksport do `.zip` (`data.json` + `blobs/`) i import (scal/zastąp), biblioteka `fflate` lub `jszip` (wpis w DECYZJE).

## Kryteria akceptacji

- K1 Testy jednostkowe (fake-indexeddb) dla każdego repozytorium: tworzenie, edycja, miękkie usuwanie, zapytania po `elementKeyPrefix` i `type`.
- K2 Eksport → wyczyszczenie bazy → import przywraca identyczne dane i Bloby (test).
- K3 Żaden plik poza `src/data` nie importuje `dexie` (reguła ESLint `no-restricted-imports`).
- K4 `labelFor` zwraca polskie etykiety dla wszystkich przykładowych kluczy z 03.
- K5 W Ustawieniach działają przyciski „Eksportuj kopię” i „Wczytaj kopię”.

## Raport

Wg `06`. W „Dla następnych” wypisz finalne sygnatury API (to jest kontrakt dla T04–T09).
