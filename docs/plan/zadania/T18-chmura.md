# T18 — Konta i synchronizacja w chmurze (Supabase)

**Moduł:** M14 · **Faza:** 4 · **Zależy od:** T10 (stabilna warstwa danych)

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do budowy domu działa dotąd lokalnie w przeglądarce (IndexedDB przez Dexie). Damian i żona chcą wspólnych danych na komputerach, telefonach i tablecie. Model danych od początku jest gotowy (UUID, `updatedAt`, `deletedAt`, `createdBy`) — D-001, Z-5.

## Cel

Logowanie (e-mail magiczny link), wspólne „gospodarstwo” (Damian + żona), dwukierunkowa synchronizacja rekordów i plików, migracja istniejących danych lokalnych.

## Przeczytaj

`03` sekcja „Gotowość pod chmurę” i tabele Dexie; `02` zasady 3–5; `04` wiersz M14. Raport T02 (API repozytoriów).

## Wymaga od Damiana (instrukcja krok po kroku)

Konto Supabase (plan darmowy), utworzenie projektu, przekazanie adresu i klucza publicznego (anon) — **nigdy** klucza service_role do repo. Decyzja: płatność tylko jeśli darmowy plan nie wystarczy (pytanie do Damiana przed jakimkolwiek kosztem).

## Pliki (wolno)

`src/data/sync/**`, `supabase/migrations/*.sql`, `src/features/settings/Account.tsx`, minimalne zmiany w `src/data/repos/*` (oznaczanie rekordów do wysłania) — z wpisem DECYZJE.

## Nie ruszaj

Publicznych sygnatur repozytoriów (UI nie może wymagać zmian).

## Do zrobienia

1. Schemat Postgres = tabele Dexie (+ `household_id`), RLS: dostęp tylko członków gospodarstwa.
2. Storage: Bloby → bucket prywatny, `MediaFile.storage = 'cloud'`, miniatury pobierane leniwie.
3. Sync: wysyłanie zmian od ostatniej synchronizacji, pobieranie zmian (`updatedAt > lastPulledAt`), last-write-wins, realtime (subskrypcja) dla natychmiastowych zmian.
4. Pierwsze logowanie: „Wyślij moje lokalne dane do chmury” (z kopią zapasową przed).
5. Zaproszenie żony (link/e-mail) do gospodarstwa.
6. Wskaźnik stanu synchronizacji.

## Kryteria akceptacji

- K1 Zmiana na jednym urządzeniu widoczna na drugim < 5 s (test e2e z 2 kontekstami).
- K2 Usunięcie propaguje się; brak duplikatów po wielokrotnej synchronizacji.
- K3 Użytkownik spoza gospodarstwa nie widzi danych (test RLS).
- K4 Aplikacja dalej działa bez logowania (tryb lokalny).
