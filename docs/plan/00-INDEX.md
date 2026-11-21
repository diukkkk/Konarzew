# Dom budowa — INDEKS PLANU (zacznij tutaj)

> Ten plik ma być krótki. Szczegóły są w plikach poniżej. Agent czyta **tylko** to, co wskazuje jego karta zadania.

## Czym jest projekt (3 zdania)
Przeglądarkowa aplikacja (komputer, telefon, tablet) dla Damiana i jego żony, wspierająca budowę domu „Stodoła S+ Exclusive”.
Centrum aplikacji to prosty, rysunkowy model 3D domu na działce. Kliknięcie elementu (dach, taras, okap, pokój, fragment działki, ściana z instalacją) pozwala przypiąć do niego „pinezkę” z notatkami, zdjęciami, linkami, pomysłami, zadaniami, statusem etapu, dokumentami i pozycjami do wspólnej listy zakupów.

## Jak pracuje agent (skrót — pełne zasady w 06)
1. Przeczytaj **tylko**: ten plik → swoją kartę `zadania/Txx-*.md` → pliki/sekcje wymienione w karcie w polu „Przeczytaj”.
2. Sprawdź w `STATUS.md`, czy zależności Twojego zadania mają status `zrobione`.
3. Pracuj tylko w plikach wymienionych w karcie. Nie zmieniaj kontraktów (typów, kluczy elementów, API modułów) bez wpisu w `DECYZJE.md`.
4. Na koniec: raport w `raporty/`, aktualizacja `STATUS.md`, ewentualne wpisy w `DECYZJE.md` (format w 06).

## Mapa plików
| Plik | Co zawiera | Kto czyta |
|---|---|---|
| `01-wizja.md` | Cel, użytkownicy, funkcje, słownik pojęć (PL↔kod) | Każdy przy pierwszym kontakcie; sekcja „Słownik” zawsze |
| `02-architektura.md` | Technologie + uzasadnienie, struktura folderów, granice modułów, publiczne API modułów | Każdy agent piszący kod (sekcje wskazane w karcie) |
| `03-model-danych.md` | Typy danych (kanoniczne), klucze elementów 3D, wersjonowanie, gotowość pod chmurę | Agenci dotykający danych |
| `04-moduly-i-zaleznosci.md` | Lista modułów, graf zależności, „co się psuje, gdy zmienisz X” | Każdy przed zmianą kontraktu |
| `05-roadmapa.md` | Fazy (MVP → działka/wnętrze → instalacje → chmura), kolejność zadań | Koordynator, Damian |
| `06-zasady-dla-agentow.md` | Zasady pracy, definicja „zrobione”, szablon raportu | Każdy agent (krótki) |
| `STATUS.md` | Tabela zadań i ich stan | Każdy agent (start i koniec) |
| `DECYZJE.md` | Dziennik decyzji, założenia (Z-), otwarte pytania (P-) | Przy zmianie kontraktu lub wątpliwości |
| `zadania/Txx-*.md` | Samowystarczalne karty zadań | Agent przypisany do zadania |
| `raporty/` | Raporty agentów po zadaniu | Koordynator, następny agent zależnego zadania |

## Źródła prawdy (gdy coś się nie zgadza)
1. Kod w repozytorium (gdy już istnieje) — `src/core/types.ts` i `src/core/elementKeys.ts` wygrywają z dokumentami.
2. `DECYZJE.md` (najnowszy wpis wygrywa).
3. Pozostałe pliki planu.
Jeśli dokument jest niezgodny z kodem — popraw dokument i odnotuj to w raporcie.

## Lokalizacja
- Plan: `/mnt/project-files/plan/` (po założeniu repozytorium kopia trafi do `docs/plan/` w repo — patrz zadanie T01).
- Materiały Damiana (rzuty, mapka, zdjęcia): `/mnt/project-files/materialy/` (do wgrania; patrz `DECYZJE.md` P-2).

Wersja planu: 1.0 (2026-11-21).
