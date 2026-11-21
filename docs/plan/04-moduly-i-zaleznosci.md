# 04 — Moduły, zależności i wpływ zmian

## Moduły
| ID | Moduł | Folder | Odpowiada za | Zależy od |
|---|---|---|---|---|
| M0 | Szkielet | `/`, `src/App.tsx`, `src/ui`, `src/i18n` | build, routing, układ ekranów, hosting | — |
| M1 | Kontrakty | `src/core` | typy, klucze elementów, ID | — |
| M2 | Dane | `src/data` | Dexie, repozytoria, hooki, backup | M1 |
| M3 | Generator 3D | `src/model3d` | geometria z `HouseSpec`/`PlotSpec` | M1 |
| M4 | Scena | `src/scene`, `src/state` | renderowanie, styl, kamera, klikanie, zaznaczenie, znaczniki pinezek | M1, M3, (M2 przez hooki) |
| M5 | Pinezki i wpisy | `src/features/pins` | panel elementu, edytory wpisów | M1, M2, M4 (selectionStore) |
| M6 | Media | `src/data/repos/media.ts`, `src/ui/Photo*` | zapis/kompresja/miniatury/galeria | M1, M2 |
| M7 | Zakupy | `src/features/shopping` | globalna lista + przycisk „dodaj do zakupów” | M1, M2 |
| M8 | Widoki zbiorcze | `src/features/board`, `tasks` | mood board, lista zadań, filtry | M1, M2, M6 |
| M9 | Działka | `src/model3d/plot`, `src/scene/PlotView` | mapka, kalibracja skali, drzewa, strefy | M3, M4, M6 |
| M10 | Wnętrze | `src/model3d/house/interior.ts` | pokoje, piętra, przekrój | M3, M4 |
| M11 | Wersje | `src/features/settings/versions`, `repos/versions` | stan vs wizja, edycja spec | M2, M3, M4 |
| M12 | Instalacje | `src/model3d/installations`, `scene/LayerView`, `repos/routes` | warstwy, rysowanie tras, zdjęcia z wymiarami | M2, M4, M6, M10 |
| M13 | Dokumentacja budowy | `features/documents`, `features/timeline` | dokumenty, kontakty, oś czasu, koszty | M2, M5, M6 |
| M14 | Chmura | `src/data/sync`, logowanie | Supabase, konta, synchronizacja | M2 (cały), M6 |
| M15 | PWA/mobile | konfiguracja, `ui` | instalacja na telefonie, szybkie zdjęcie | M0, M5, M6 |

## Graf zależności (kto na kim stoi)
```
M1 Kontrakty ──┬─> M2 Dane ──┬─> M5 Pinezki ──> M13 Dokumentacja
               │             ├─> M6 Media ───┬─> M8 Widoki zbiorcze
               │             ├─> M7 Zakupy   ├─> M9 Działka
               │             ├─> M11 Wersje  └─> M12 Instalacje
               │             └─> M14 Chmura
               └─> M3 Generator 3D ─> M4 Scena ─┬─> M5, M9, M10, M11, M12
M0 Szkielet ─> wszystkie widoki
```

## „Co się psuje, gdy zmienisz X” (reguły wpływu)
| Zmiana | Wpływ | Wymagane działanie |
|---|---|---|
| Typ w `core/types.ts` (dodanie pola opcjonalnego) | Niski | Wpis w DECYZJE; aktualizacja 03 |
| Typ w `core/types.ts` (zmiana/usunięcie pola, nowy wymagany) | M2 (migracja), wszystkie moduły używające typu, backup, przyszły sync | Migracja Dexie `version(n+1)`, test importu starego backupu, wpis w DECYZJE, aktualizacja 03 |
| Format `elementKey` lub zmiana klucza istniejącego elementu | **Krytyczny**: pinezki tracą element | Zakazane bez migracji kluczy (`migrateElementKeys(map)` w M2) + wpis w DECYZJE |
| Nowy element w generatorze (nowy klucz) | Niski | Dodaj etykietę w `elementKeys.ts` (`labelFor`) |
| Struktura `HouseSpec` | M3, M9, M10, M11, zapisane wersje | `schemaVersion` +1 i funkcja aktualizacji starych spec |
| Publiczne API repozytorium (sygnatura) | Wszystkie funkcje używające | Zachowaj starą sygnaturę lub popraw wszystkie użycia w tym samym zadaniu; wpis w DECYZJE |
| `selectionStore` / `viewStore` | M4, M5, M9–M12 | Wpis w DECYZJE; sprawdź wszystkie `use*Store` |
| Nowa biblioteka | Rozmiar, spójność | Wpis w DECYZJE z uzasadnieniem |
| Styl/wygląd sceny | Tylko M4 | Bez formalności |
| Teksty UI | Tylko `i18n/pl.ts` | Bez formalności |

## Zadania, które mogą iść równolegle
- Po T02 (dane) i T03 (scena): T04 (generator), T07 (media), T08 (zakupy) — różne foldery.
- T09 (widoki) czeka na T06 i T07.
- Faza 2: T10 (działka) ∥ T11 (wnętrze); T12 (wersje) po obu lub równolegle, jeśli nie ruszają `HouseSpec`.
- Nie uruchamiaj równolegle dwóch zadań, które zmieniają `src/core` — kolizje kontraktów.
