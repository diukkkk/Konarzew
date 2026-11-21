# DECYZJE, ZAŁOŻENIA, OTWARTE PYTANIA

Dopisuj na końcu sekcji; nie kasuj (oznacz `ZASTĄPIONE przez …`). Format w `06-zasady-dla-agentow.md`.

## Decyzje (D-)

### D-001 (2026-11-21, plan, moduły: wszystkie)

Decyzja: Start jako aplikacja w przeglądarce, dane lokalnie (IndexedDB), bez logowania. Konta i chmura w fazie 4.
Dlaczego: Damian bez doświadczenia programistycznego; najszybsza droga do używalnego MVP; brak kosztów serwera.
Wpływ: model danych od początku z UUID/`updatedAt`/`deletedAt` (03).

### D-002 (2026-11-21, plan, M3, M4)

Decyzja: Model 3D generowany proceduralnie z `HouseSpec` (JSON), nie modelowany w Blenderze.
Dlaczego: zmiany w rzutach = zmiana liczb; stałe `elementKey`; łatwe wersje „stan/wizja”; agenci mogą edytować bez narzędzi graficznych.
Wpływ: prosta bryła stodoły wystarcza do stylu rysunkowego; detale (np. profil okapu) jako uproszczone bryły.

### D-003 (2026-11-21, plan, M1, M2, M5)

Decyzja: Pinezki wiążą się z `elementKey` (+ opcjonalny punkt), a nie z siatką ani wersją.
Dlaczego: aktualizacje modelu nie gubią notatek.
Wpływ: zmiana kluczy wymaga migracji (04).

### D-004 (2026-11-21, plan, wszystkie)

Decyzja: Stos: TypeScript, Vite, React, three.js + react-three-fiber + drei, Zustand, Dexie, Tailwind, Vitest, Playwright; chmura Supabase (faza 4).
Dlaczego: patrz `02-architektura.md`.

### D-005 (2026-11-21, plan, M2)

Decyzja: Jedna globalna lista zakupów; pozycja pamięta `sourcePinId`/`sourceEntryId`.

## Założenia (Z-) — do potwierdzenia przy okazji

- Z-1: Dom parterowy z użytkowym poddaszem (typowe dla „Stodoła S+”); dach dwuspadowy bez okapów na szczytach lub z minimalnymi. **Do weryfikacji z rzutami w T05.**
- Z-2: Pokrycie dachu: blacha na rąbek (typowe dla stodół). Do potwierdzenia.
- Z-3: Hosting statyczny GitHub Pages (darmowy) — wybór ostateczny w T01. Adres publiczny, ale dane są lokalne w przeglądarce, więc nikt obcy ich nie zobaczy.
- Z-4: Zdjęcia zmniejszane do max 2560 px dłuższego boku (jakość ~0,85) + miniatura 400 px. Oryginały Damian trzyma u siebie.
- Z-5: Synchronizacja „ostatni zapis wygrywa” wystarczy dla 2 osób.
- Z-6: Kolejność faz może się zmienić, jeśli żona potrzebuje dostępu wcześniej.
- Z-7: Jeden dom / jeden projekt w aplikacji (bez wyboru projektów). Pole na wiele projektów niepotrzebne.

## Otwarte pytania (P-)

- P-1: ~~Repozytorium kodu~~ Repo `diukkkk/Konarzew` założone 2026-11-21; brakuje jeszcze połączenia konta GitHub z Claude.
- P-2: Materiały: rzuty (PDF/zdjęcia), mapka, zdjęcia satelitarne, zdjęcia domu — wgrać do projektu (folder `materialy/`). **Blokuje T05, T11.**
- P-3: Jakie zmiany względem projektu katalogowego (np. przesunięte okna, inny taras)? Do T05.
- P-4: Czy koszty mają być widoczne dla obojga, czy ukrywane? (faza 3)

## Decyzje (D-) — dopisane później

### D-006 (2026-11-21, T01, moduły: M0, wszystkie)

Decyzja: Wersje bibliotek: React 19.3, react-dom 19.3, react-router-dom 7, three 0.187, @react-three/fiber 9.8, @react-three/drei 10.7, zustand 5, dexie 4.4 + dexie-react-hooks 4, Vite 8, TypeScript 6 (strict + noUncheckedIndexedAccess), Tailwind 4 (wtyczka @tailwindcss/vite, bez pliku tailwind.config), Vitest 5, Playwright 1.65, ESLint 10 (flat config). Node 22.
Dlaczego: aktualne stabilne wersje; fiber 9 wymaga React 19 (plan zakładał React 18 — ZASTĄPIONE).
Wpływ: brak dla kontraktów.

### D-007 (2026-11-21, T01, moduły: M0)

Decyzja: Routing przez HashRouter (adresy `…/Konarzew/#/zakupy`). Hosting: GitHub Pages, repozytorium `diukkkk/Konarzew`, adres https://diukkkk.github.io/Konarzew/ (Z-3 potwierdzone). Base path Vite `/Konarzew/` (nadpisywalny przez `VITE_BASE`).
Dlaczego: GitHub Pages nie obsługuje przekierowań dla BrowserRouter; hash działa bez konfiguracji.
Wpływ: T09 trzyma filtry w części adresu po `#` (działa normalnie z React Router).

### D-008 (2026-11-21, T01, moduły: M2)

Decyzja: Reguła ESLint `no-restricted-imports` blokuje `dexie` i `dexie-react-hooks` poza `src/data/**` (już działa, T02 nie musi jej dodawać).
