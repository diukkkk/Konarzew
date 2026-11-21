# STATUS zadań

Aktualizacja: 2026-11-21 (model 3D na działce)

| ID | Zadanie | Faza | Zależy od | Status | Uwagi |
|---|---|---|---|---|---|
| T01 | Szkielet aplikacji, repozytorium, hosting | 1 | — | zrobione | PR #1 scalony; strona https://diukkkk.github.io/Konarzew/ |
| T02 | Kontrakty i warstwa danych + backup | 1 | T01 | do-zrobienia | |
| T03 | Scena 3D i styl rysunkowy | 1 | T01 | do-przegladu | PR „Model 3D domu na działce” — raporty/T03-T04-T05-2026-11-21.md |
| T04 | Generator bryły domu z HouseSpec | 1 | T02, T03 | do-przegladu | j.w.; zrobione przed T02 (D-010) |
| T05 | Wymiary z rzutów → house.default.json | 1 | T04, materiały | do-przegladu | j.w.; wymiary z WYMIARY.md, założenia w house.default.json → extras |
| T06 | Klikanie + panel pinezki + wpisy tekstowe | 1 | T02, T04 | do-zrobienia | |
| T07 | Zdjęcia i pomysły (media) | 1 | T02 | do-zrobienia | |
| T08 | Lista zakupów | 1 | T02 | do-zrobienia | |
| T09 | Widoki zbiorcze: tablica, zadania, filtry | 1 | T06, T07 | do-zrobienia | |
| T10 | Wydanie MVP | 1 | T05–T09 | do-zrobienia | |
| T11 | Działka | 2 | T04, T07 | częściowo | Działka, posadowienie, drzewa, podjazd, las gotowe; brak edytora/kalibracji mapki i mapki jako podłoża |
| T12 | Wnętrze | 2 | T04, T05 | do-zrobienia | |
| T13 | Wersje modelu | 2 | T04, T06 | do-zrobienia | |
| T14 | Warstwy instalacji: trasy | 3 | T12, T13 | do-zrobienia | |
| T15 | Zdjęcia instalacji z wymiarami | 3 | T07, T14 | do-zrobienia | |
| T16 | Dokumenty i kontakty | 3 | T06, T07 | do-zrobienia | |
| T17 | Oś czasu i koszty | 3 | T06, T16 | do-zrobienia | |
| T18 | Konta i synchronizacja (Supabase) | 4 | T10 | do-zrobienia | |
| T19 | PWA i szybkie zdjęcie z budowy | 4 | T18 lub T10 | do-zrobienia | |
