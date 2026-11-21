# T16 — Dokumenty i kontakty wykonawców
**Moduł:** M13 · **Faza:** 3 · **Zależy od:** T06, T07 · **Odblokowuje:** T17

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; do elementów modelu 3D przypina się pinezki z wpisami. Damian chce trzymać przy elementach umowy, faktury, gwarancje i karty techniczne (np. gwarancja na blachę przy dachu) oraz kontakty wykonawców. Pliki zapisuje moduł media (T07).

## Cel
Wpisy `dokument` i `kontakt`, książka kontaktów, widok „Dokumenty” z przypomnieniem o kończących się gwarancjach.

## Przeczytaj
`03` wpisy `dokument`, `kontakt`, typ `Contact`. Raporty T06 (rejestracja edytorów), T07 (PDF w `saveMedia`).

## Pliki (wolno)
`src/features/documents/**`, `src/features/pins/editors/DocumentEditor.tsx`, `ContactEditor.tsx`, `src/data/repos/contacts.ts`.

## Do zrobienia
1. Dodanie dokumentu (PDF/zdjęcie) z rodzajem i datą ważności; podgląd PDF w przeglądarce (natywny `<iframe>`/`object`, bez ciężkich bibliotek).
2. Kontakty: imię/firma, branża, telefon (klik = dzwoń), e-mail, notatka; przypięcie kontaktu do elementu z rolą („dekarz”).
3. Widok „Dokumenty”: lista z filtrem rodzaju i elementu; sekcja „Gwarancje kończące się w ciągu 90 dni”.
4. Widok „Kontakty” (podstrona Ustawień lub osobna zakładka — zapisz wybór w DECYZJE).

## Kryteria akceptacji
- K1 PDF dodany przy dachu otwiera się z widoku Dokumenty i z panelu dachu.
- K2 Klik w telefon na komórce uruchamia połączenie (`tel:`).
