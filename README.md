# Dom Konarzew

Aplikacja wspierająca budowę domu (projekt „Stodoła S+ Exclusive”): rysunkowy model 3D domu na działce, w którym każdy element (dach, taras, pokój, ściana z instalacją) ma swoje pinezki z notatkami, zdjęciami, linkami, zadaniami, etapami i wspólną listą zakupów.

**Strona:** https://diukkkk.github.io/Konarzew/

Dane zapisują się w przeglądarce na danym urządzeniu (bez logowania). Wspólne konto i chmura są zaplanowane w fazie 4.

## Plan projektu

Cały plan jest w [`docs/plan/`](docs/plan/00-INDEX.md). Każde zadanie ma kartę w `docs/plan/zadania/`. Status: `docs/plan/STATUS.md`.

## Dla agentów / programistów

Wymagany Node.js 22.

```bash
npm install
npm run dev        # serwer deweloperski (http://localhost:5173/Konarzew/)
npm run lint       # ESLint
npm test           # testy jednostkowe (Vitest)
npm run test:e2e   # testy w przeglądarce (Playwright); lokalnie z PW_CHROMIUM_PATH=/ścieżka/do/chromium, jeśli trzeba
npm run build      # wersja produkcyjna w dist/
```

- Teksty interfejsu: `src/i18n/pl.ts`.
- Nowy widok: pozycja w `src/routes.tsx` + trasa w `src/App.tsx`.
- Dostęp do bazy tylko przez `src/data` (pilnuje tego ESLint).
- Publikacja: każdy push do `main` publikuje stronę na GitHub Pages (`.github/workflows/deploy.yml`).
