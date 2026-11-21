# T01 — Szkielet aplikacji, repozytorium, hosting

**Moduł:** M0 · **Faza:** 1 · **Zależy od:** — · **Odblokowuje:** T02, T03

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) dla Damiana i żony do prowadzenia budowy domu: model 3D domu, w którym klik w element pozwala przypinać notatki, zdjęcia, zadania, zakupy. Damian nie programuje — wszystko, co musi zrobić sam, opisz krokami. Dane lokalnie w przeglądarce (faza 1), później chmura.

## Cel

Działający, pusty szkielet aplikacji pod stałym adresem w internecie, z nawigacją i ustalonymi narzędziami, żeby kolejni agenci tylko dokładali moduły.

## Przeczytaj

`02-architektura.md` (całość), `06-zasady-dla-agentow.md`.

## Wejścia / wymagania od Damiana

- P-1: repozytorium GitHub. Przygotuj Damianowi instrukcję: załóż konto GitHub → utwórz puste repo (proponowana nazwa `dom-budowa`) → podłącz do Claude (https://claude.ai/connect-github). Agent nie może sam utworzyć repo.

## Pliki (wolno tworzyć/zmieniać)

Root (`package.json`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.*`, `.eslintrc*`, `.prettierrc`, `.github/workflows/*`, `index.html`, `README.md`), `src/main.tsx`, `src/App.tsx`, `src/routes.tsx`, `src/ui/*`, `src/i18n/pl.ts`, `docs/plan/*` (kopia planu), puste foldery z `02` (z plikiem `README.md` opisującym przeznaczenie).

## Nie ruszaj

`src/core`, `src/data`, `src/model3d`, `src/scene` — tylko puste foldery z README.

## Do zrobienia

1. Vite + React + TS (strict), Tailwind, ESLint + Prettier, Vitest, Playwright; skrypty `dev`, `build`, `test`, `test:e2e`, `lint`.
2. Zainstaluj zależności z D-004 (three, @react-three/fiber, @react-three/drei, zustand, dexie, dexie-react-hooks, react-router-dom) — nawet jeśli jeszcze nieużywane; zapisz wersje w DECYZJE (nowy wpis D-…).
3. Układ: górny/boczny pasek (desktop) i dolny pasek (telefon) z widokami: **Model**, **Tablica**, **Zadania**, **Zakupy**, **Oś czasu**, **Ustawienia** — każdy na razie z napisem „Wkrótce”.
4. Widok Model zajmuje cały ekran (miejsce na Canvas) + wysuwany panel boczny/dolny (`ui/Sheet`) na szczegóły pinezki.
5. CI (GitHub Actions): lint + test + build na każdym PR; deploy na GitHub Pages z gałęzi `main` (`base` w vite pod nazwę repo).
6. Skopiuj `/mnt/project-files/plan/` do `docs/plan/`.
7. `README.md` po polsku: co to jest, adres strony, jak uruchomić lokalnie (dla agentów).

## Kryteria akceptacji

- K1 `npm run build`, `lint`, `test` przechodzą lokalnie i w CI.
- K2 Strona dostępna pod adresem GitHub Pages; nawigacja działa (test Playwright klika wszystkie zakładki).
- K3 Na szerokości 390 px (telefon) widoczny dolny pasek, bez poziomego przewijania; na ≥1024 px pasek boczny.
- K4 Teksty interfejsu wyłącznie z `src/i18n/pl.ts`.
- K5 `docs/plan/` w repo.

## Raport

Wg `06`. W „Dla Damiana”: adres strony i co zobaczy.
