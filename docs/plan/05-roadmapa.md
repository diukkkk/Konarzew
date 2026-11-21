# 05 — Roadmapa

Zasada: każda faza kończy się czymś, czego Damian może realnie używać. Kolejność wynika z grafu w `04`.

## Faza 1 — MVP: „klikam dach i przypinam rzeczy” (lokalnie, bez logowania)
| Zadanie | Nazwa | Zależy od | Równolegle z |
|---|---|---|---|
| T01 | Szkielet aplikacji, repozytorium, hosting | — | T05 (Damian dostarcza materiały) |
| T02 | Kontrakty i warstwa danych + kopia zapasowa | T01 | T03 |
| T03 | Scena 3D i styl rysunkowy | T01 | T02 |
| T04 | Generator bryły domu z `HouseSpec` | T02, T03 | T07, T08 |
| T05 | Wymiary z rzutów → `house.default.json` | T04 (format), materiały od Damiana | — |
| T06 | Klikanie elementów + panel pinezki + wpisy tekstowe | T02, T04 | T07, T08 |
| T07 | Zdjęcia i pomysły (media) | T02 | T04, T06, T08 |
| T08 | Lista zakupów | T02 | T04, T06, T07 |
| T09 | Widoki zbiorcze: tablica, zadania, filtry | T06, T07 | T08 |
| T10 | Wydanie MVP: testy, telefon/tablet, instrukcja | T05–T09 | — |

**Efekt fazy 1:** strona pod stałym adresem; model domu z prawdziwymi wymiarami; klik → pinezki z notatkami, zdjęciami, linkami, zadaniami, statusem etapu; lista zakupów; tablica pomysłów; eksport kopii.
**Ograniczenie fazy 1:** dane tylko w jednej przeglądarce. Żonie można przekazać plik kopii (eksport/import) do czasu fazy 4.

## Faza 2 — działka, wnętrze, wersje
| T11 | Działka: mapka w skali, posadowienie, drzewa, strefy | T04, T07 |
| T12 | Wnętrze: pokoje, piętra, przekrój | T04, T05 |
| T13 | Wersje modelu: stan aktualny vs wizja | T04, T06 |

## Faza 3 — instalacje i dokumentacja budowy
| T14 | Warstwy instalacji: rysowanie tras | T12, T13 |
| T15 | Zdjęcia instalacji z wymiarami | T07, T14 |
| T16 | Dokumenty i kontakty wykonawców | T06, T07 |
| T17 | Oś czasu budowy i koszty | T06, T16 |

## Faza 4 — współdzielenie
| T18 | Konta i synchronizacja w chmurze (Supabase) | T10 + cała warstwa danych stabilna |
| T19 | PWA i „szybkie zdjęcie z budowy” | T18 (lub T10 w wersji lokalnej) |

**Uwaga (Z-6):** jeśli wspólna praca z żoną okaże się pilna wcześniej, T18 można przesunąć zaraz po T10 — model danych jest na to gotowy.

## Kamienie milowe dla Damiana
1. Po T01: widzisz pustą aplikację pod swoim adresem.
2. Po T04: widzisz bryłę stodoły (wymiary orientacyjne).
3. Po T06: możesz klikać i notować.
4. Po T10: używasz na co dzień.
