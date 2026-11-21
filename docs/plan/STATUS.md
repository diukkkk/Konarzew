# STATUS zadań

Aktualizacja: 2026-11-21 (utworzenie planu)

| ID  | Zadanie                                   | Faza | Zależy od      | Status       | Uwagi                                                  |
| --- | ----------------------------------------- | ---- | -------------- | ------------ | ------------------------------------------------------ |
| T01 | Szkielet aplikacji, repozytorium, hosting | 1    | —              | w-toku       | Kod gotowy lokalnie; czeka na połączenie GitHuba (P-1) |
| T02 | Kontrakty i warstwa danych + backup       | 1    | T01            | do-zrobienia |                                                        |
| T03 | Scena 3D i styl rysunkowy                 | 1    | T01            | do-zrobienia |                                                        |
| T04 | Generator bryły domu z HouseSpec          | 1    | T02, T03       | do-zrobienia |                                                        |
| T05 | Wymiary z rzutów → house.default.json     | 1    | T04, materiały | do-zrobienia | Czeka na rzuty od Damiana (P-2)                        |
| T06 | Klikanie + panel pinezki + wpisy tekstowe | 1    | T02, T04       | do-zrobienia |                                                        |
| T07 | Zdjęcia i pomysły (media)                 | 1    | T02            | do-zrobienia |                                                        |
| T08 | Lista zakupów                             | 1    | T02            | do-zrobienia |                                                        |
| T09 | Widoki zbiorcze: tablica, zadania, filtry | 1    | T06, T07       | do-zrobienia |                                                        |
| T10 | Wydanie MVP                               | 1    | T05–T09        | do-zrobienia |                                                        |
| T11 | Działka                                   | 2    | T04, T07       | do-zrobienia | Czeka na mapkę (P-2)                                   |
| T12 | Wnętrze                                   | 2    | T04, T05       | do-zrobienia |                                                        |
| T13 | Wersje modelu                             | 2    | T04, T06       | do-zrobienia |                                                        |
| T14 | Warstwy instalacji: trasy                 | 3    | T12, T13       | do-zrobienia |                                                        |
| T15 | Zdjęcia instalacji z wymiarami            | 3    | T07, T14       | do-zrobienia |                                                        |
| T16 | Dokumenty i kontakty                      | 3    | T06, T07       | do-zrobienia |                                                        |
| T17 | Oś czasu i koszty                         | 3    | T06, T16       | do-zrobienia |                                                        |
| T18 | Konta i synchronizacja (Supabase)         | 4    | T10            | do-zrobienia |                                                        |
| T19 | PWA i szybkie zdjęcie z budowy            | 4    | T18 lub T10    | do-zrobienia |                                                        |
