# 01 — Wizja, użytkownicy, funkcje, słownik

## Cel
Jedno miejsce, w którym cała wiedza o budowie domu jest „przypięta” do konkretnego miejsca w domu lub na działce. Zamiast folderów i czatów — klikasz dach i widzisz wszystko o dachu.

## Użytkownicy i urządzenia
- Damian (główny), żona Damiana (współedytorka). Brak doświadczenia programistycznego — interfejs musi być prosty, po polsku.
- Komputer (planowanie), telefon (na budowie: zdjęcie → przypnij), tablet (przeglądanie, mood board).
- Zasięg internetu na budowie jest; tryb offline **nie** jest wymagany (ale aplikacja i tak trzyma dane lokalnie w fazie 1).

## Stan wyjściowy
- Dom: projekt katalogowy „Stodoła S+ Exclusive” z drobnymi zmianami. Etap: stan surowy zamknięty.
- Materiały: rzuty, zdjęcia domu, mapka działki, zdjęcia satelitarne (drzewa), zdjęcia do skali. (Jeszcze nie wgrane.)

## Styl 3D
Prosta bryła, rysunkowo (inspiracja: gry strategiczne z lat 90. w rzucie izometrycznym, ale ostrzejsze krawędzie). Płaskie kolory, cieniowanie „toon”, wyraźne obrysy. Bez fotorealizmu — realistyczne rendery Damian robi osobno w narzędziach AI.

## Funkcje (pełna lista; fazy w 05-roadmapa.md)
**Rdzeń (MVP)**
- F1 Model 3D domu: obrót/przybliżanie, klikalne elementy (dach, połacie, okap/skrzynia okapowa, murłata, ściany, okna, drzwi, taras, komin…).
- F2 Pinezki: do elementu (lub punktu na elemencie) przypinasz wpisy:
  notatka, zdjęcie, link, pomysł (mood board), zadanie (to-do), status etapu, pozycja zakupów, dokument, kontakt, koszt.
- F3 Wspólna lista zakupów: prosta lista; „dodaj do listy zakupów” z dowolnej pinezki; pozycja pamięta, skąd pochodzi.
- F4 Widok zbiorczy: wszystkie zadania / pomysły / zakupy / etapy w formie list i tablicy kafelków (styl Pinterest), z filtrem po elemencie i typie.
- F5 Kopia zapasowa: eksport/import całości do jednego pliku (dane + zdjęcia).

**Faza 2 — działka i wnętrze**
- F6 Działka: mapka jako podłoże w skali, posadowienie i obrót domu, drzewa (z satelity), strefy (podjazd, ogród, taras, szambo/oczyszczalnia, przyłącza).
- F7 Wnętrze: pomieszczenia z rzutów, piętra, ukrywanie dachu/przekrój; pinezki na pokojach i ścianach.
- F8 Wersje modelu: „stan aktualny” i „wizja” (i kolejne). Pinezki zostają przy elementach między wersjami.

**Faza 3 — instalacje i dokumentacja budowy**
- F9 Warstwy instalacji: woda, prąd, kanalizacja, CO/ogrzewanie, kamery/smart home, (później: wentylacja). Trasy rysowane po ścianach/podłogach; włączanie/wyłączanie warstw.
- F10 Zdjęcia instalacji przed zakryciem: zdjęcie przypięte do punktu na ścianie + wymiary (np. „35 cm od narożnika, 120 cm od podłogi”).
- F11 Dokumenty: umowy, faktury, gwarancje, karty techniczne (PDF/zdjęcia) przy elementach.
- F12 Wykonawcy: kontakty przypisane do etapów/elementów.
- F13 Oś czasu budowy: etapy z datami, co zrobione, co dalej.
- F14 Koszty (opcjonalne): kwoty przy wpisach, sumy per element/etap.

**Faza 4 — współdzielenie**
- F15 Konta i synchronizacja w chmurze (Damian + żona, wiele urządzeń).
- F16 Instalowalna aplikacja na telefon (PWA), szybkie „zdjęcie z budowy → przypnij”.

## Słownik (PL w interfejsie ↔ nazwa w kodzie)
| Interfejs (PL) | Kod | Znaczenie |
|---|---|---|
| Element | `Element`, `elementKey` | Klikalna część modelu 3D o stałym kluczu, np. `dom.dach.polac-pd` |
| Pinezka | `Pin` | Punkt przypięcia na elemencie (cały element lub konkretny punkt) |
| Wpis | `Entry` | Jedna rzecz w pinezce: notatka, zdjęcie, link, zadanie… |
| Etap / status etapu | `Entry` typu `etap` | Np. „obróbki blacharskie — zrobione 2026-10-12” |
| Lista zakupów | `ShoppingItem` | Globalna lista; pozycja może wskazywać pinezkę źródłową |
| Wersja modelu | `ModelVersion` | Zestaw parametrów domu (stan aktualny / wizja) |
| Specyfikacja domu | `HouseSpec` | JSON z wymiarami i elementami, z którego generowany jest model 3D |
| Warstwa | `Layer` | Instalacja (woda, prąd…) lub warstwa widoku (działka, wnętrze) |
| Trasa instalacji | `InstallationRoute` | Linia łamana na ścianach/podłodze w danej warstwie |
| Plik/media | `MediaFile` | Zdjęcie lub dokument (przechowywany osobno od danych) |
| Kontakt | `Contact` | Wykonawca, sklep, urząd |
