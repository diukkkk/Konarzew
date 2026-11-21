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
- P-1: ROZWIĄZANE 2026-11-21 — repo `diukkkk/Konarzew`, GitHub połączony.
- P-2: ROZWIĄZANE 2026-11-21 — materiały w `/mnt/project-files/materialy/` (dzialka, rzuty, wizja, zdjecia, podglad); podsumowanie wymiarów w `materialy/WYMIARY.md` (dom 20,28 × 16,86 m, działka ok. 4800 m²). Rzuty pięter (pokoje) — do sprawdzenia, czy są.
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

### D-009 (2026-11-21, T03/T04/T05, moduły: M1, M3, M4)
Decyzja: `HouseSpec` dostosowany do realnej bryły (zastępuje opis w 03): układ domu x = wzdłuż kalenicy od szczytu salonu (0) do szczytu garażu, z = od ogrodu (0) do frontu; nowe pola `wallHeight`, `groundLevel`, `mainBlock.depth`, `flatParts[]` (garaż, zadaszenie wejścia), `gableGlazing[]`, `pergolas[]`; `Opening.wall` = `pn | pd | zach | wsch | garaz-pd | garaz-wsch | garaz-zach`, `offset` mierzony wzdłuż osi domu. `PlotSpec.surroundingForest` (dekoracyjny las). Kanoniczne typy: `src/core/types.ts`.
Dlaczego: dom to bryła dwuspadowa + niska część z płaskim dachem; prosty prostokąt z 03 jej nie opisywał.
Wpływ: T11 (edytor działki) i T12/T13 pracują na tych polach. Element może mieć kilka brył z tym samym `elementKey` (np. murłata, obróbki) — kliknięcie dowolnej zaznacza cały element.

### D-010 (2026-11-21, T03/T04, moduły: M2, M4)
Decyzja: Na prośbę Damiana („chcę zobaczyć model na działce”) T03, T04, T05 i część T11 zrobione przed T02. Scena czyta spec bezpośrednio z `src/model3d/specs/house.default.json` (`defaultHouseSpec`). T02 ma podmienić to na `useActiveVersion()` (wersja „Stan aktualny” tworzona z tego pliku) — jedna zmiana w `ModelPage.tsx`.
Wpływ: T02 nie zmienia `HouseSpec`; `src/core/elementKeys.ts` już istnieje (T02 może rozbudować, nie przepisywać).

### D-011 (2026-11-21, T03, moduły: M4)
Decyzja: Kamera perspektywiczna fov 30° (efekt quasi-izometryczny), OrbitControls, styl MeshToonMaterial (4 stopnie) + obrys `Edges`. Scena ładowana leniwie (osobny plik ~260 kB gzip). Testy e2e klikają elementy przez `window.__konarzew.screenPositionOf(key)`; WebGL w CI przez SwiftShader.
