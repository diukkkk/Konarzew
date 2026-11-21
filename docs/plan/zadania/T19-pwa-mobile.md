# T19 — PWA i „szybkie zdjęcie z budowy”

**Moduł:** M15 · **Faza:** 4 · **Zależy od:** T18 (lub T10 w wersji lokalnej)

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do budowy domu, używana także na telefonie na budowie. Najczęstsza czynność: zrobić zdjęcie i przypiąć je do miejsca w domu. Ma się to dziać w kilku stuknięciach, z ikoną aplikacji na ekranie telefonu.

## Cel

Instalowalna aplikacja (PWA) + skrót „Szybkie zdjęcie”.

## Przeczytaj

`02` (PWA w stosie). Raporty T07, T10.

## Pliki (wolno)

`vite.config.ts` (vite-plugin-pwa), `public/icons/*`, `src/features/quick/**`, `src/ui/*` (poprawki mobilne).

## Do zrobienia

1. Manifest, ikony, ekran startowy; instrukcja „Dodaj do ekranu głównego” (iOS/Android).
2. Szybkie zdjęcie: duży przycisk → aparat → wybór miejsca: ostatnio używane elementy, lista grup, lub klik w model → zapis.
3. „Do przypięcia później”: zdjęcia bez miejsca w skrzynce odbiorczej.
4. Udostępnij do aplikacji (Web Share Target, Android) — opcjonalnie.

## Kryteria akceptacji

- K1 Lighthouse PWA: instalowalna.
- K2 Zdjęcie przypięte do ostatnio używanego elementu w ≤4 stuknięciach.
