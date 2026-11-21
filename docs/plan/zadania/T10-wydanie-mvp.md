# T10 — Wydanie MVP

**Moduły:** wszystkie fazy 1 · **Faza:** 1 · **Zależy od:** T05–T09 · **Odblokowuje:** T18, fazę 2

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do budowy domu: model 3D, pinezki z wpisami, zdjęcia, zakupy, tablica, zadania — wszystko lokalnie w przeglądarce. Faza 1 jest gotowa funkcjonalnie; trzeba ją dopiąć, by Damian i żona zaczęli realnie używać. Damian nie programuje.

## Cel

Stabilna, przetestowana wersja 1.0 + instrukcja obsługi po polsku.

## Przeczytaj

`STATUS.md`, raporty T01–T09 (sekcje „Znane problemy”), `05` „Efekt fazy 1”.

## Pliki (wolno)

`tests/e2e/**`, poprawki błędów w dowolnym module (każda opisana w raporcie), `docs/instrukcja.md`, `src/features/settings/**`.

## Nie ruszaj

Kontraktów (`src/core`, API repozytoriów) — poza poprawkami błędów z wpisem DECYZJE.

## Do zrobienia

1. Scenariusz e2e „dzień na budowie”: otwórz na telefonie → zdjęcie → przypnij do ściany → zadanie → zakup → eksport.
2. Testy na: Chrome desktop, Safari iOS (emulacja WebKit), Chrome Android (emulacja); tablet poziomo/pionowo.
3. Ekran powitalny przy pierwszym uruchomieniu (3 kroki: obracaj, klikaj, przypinaj).
4. Przypomnienie o kopii zapasowej (co 7 dni od ostatniego eksportu).
5. `docs/instrukcja.md` dla Damiana i żony (ze zrzutami ekranu); jak przekazać dane żonie plikiem kopii do czasu fazy 4.
6. Tag `v1.0`.

## Kryteria akceptacji

- K1 Wszystkie e2e zielone na 3 silnikach.
- K2 Brak błędów w konsoli przy scenariuszu z pkt 1.
- K3 Damian przechodzi scenariusz sam z instrukcją (potwierdzenie w wątku).
