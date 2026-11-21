# 06 — Zasady dla agentów i raportowanie

## Przed startem (max 5 minut czytania)

1. `00-INDEX.md` → swoja karta `zadania/Txx-*.md` → tylko pliki/sekcje z pola „Przeczytaj”.
2. `STATUS.md`: zależności muszą mieć `zrobione`. Jeśli nie — zgłoś blokadę, nie zgaduj ich wyników.
3. Ustaw w `STATUS.md` swoje zadanie na `w-toku` z datą.
4. Ostatnie wpisy w `DECYZJE.md` (tylko dotyczące Twoich modułów — szukaj po ID modułu, np. `M2`).
5. Raport poprzedniego zadania, od którego zależysz (`raporty/`), sekcja „Dla następnych”.

## W trakcie

- Zmieniaj tylko pliki z pola „Pliki” karty. Jeśli musisz ruszyć coś spoza — zapisz w raporcie i, jeśli to kontrakt (`src/core`, API repozytoriów, store'y, `HouseSpec`), dodaj wpis w `DECYZJE.md` i sprawdź tabelę wpływu w `04`.
- **Nie wymyślaj danych o domu** (wymiarów, układu pokoi). Brak danych → wartość tymczasowa oznaczona `// ZAŁOŻENIE:` w kodzie i pozycja w `DECYZJE.md` (Z-…).
- Interfejs po polsku, teksty w `src/i18n/pl.ts`.
- Każde kryterium akceptacji musi mieć test (Vitest lub Playwright) albo opisaną ręczną weryfikację w raporcie.
- Damian nie programuje: wszystko, co musi zrobić sam, opisz krokami „kliknij X, wpisz Y”.

## Definicja „zrobione”

- Wszystkie kryteria akceptacji z karty spełnione i sprawdzone.
- `npm run build`, `npm run test`, `npm run lint` przechodzą.
- Zmiany wypchnięte na gałąź, PR otwarty (lub scalony, jeśli Damian tak zdecydował).
- Raport zapisany, `STATUS.md` zaktualizowany, dokumenty planu poprawione, jeśli kontrakt się zmienił.

## Raport — `raporty/Txx-RRRR-MM-DD.md`

```markdown
# Raport Txx — <nazwa>

Status: zrobione | częściowo | zablokowane
Data: RRRR-MM-DD PR/gałąź: <link>

## Co zrobiono (3–7 punktów)

## Kryteria akceptacji

- [x] K1 … (jak sprawdzono: test `xyz.test.ts` / ręcznie: …)

## Zmienione kontrakty (API, typy, klucze, store'y) — lub „brak”

- … (wpis w DECYZJE: D-…)

## Założenia i wartości tymczasowe — lub „brak”

## Znane problemy / dług techniczny

## Dla następnych (co musi wiedzieć zadanie zależne; gdzie są punkty wejścia)

## Dla Damiana (1–3 zdania po ludzku: co nowego widzi i co ma ewentualnie zrobić)
```

## `STATUS.md` — jak aktualizować

Jeden wiersz na zadanie. Statusy: `do-zrobienia`, `w-toku`, `zablokowane`, `do-przegladu`, `zrobione`. Kolumna „Uwagi”: max 1 zdanie + link do raportu.

## `DECYZJE.md` — jak dopisywać

Dopisuj na końcu odpowiedniej sekcji, nigdy nie kasuj (najwyżej oznacz `ZASTĄPIONE przez D-…`).

```
### D-007 (2026-12-02, T04, moduły: M3, M1)
Decyzja: …
Dlaczego: …
Wpływ: … (które moduły/zadania)
```

## Gdy coś jest niejasne

1. Sprawdź `DECYZJE.md` (P- otwarte pytania).
2. Wybierz najbezpieczniejszą, odwracalną opcję, zapisz ją jako założenie Z-… i jedź dalej.
3. Decyzje nieodwracalne lub zmieniające cel (np. usunięcie danych, płatne usługi) — zatrzymaj się i zapytaj Damiana.
