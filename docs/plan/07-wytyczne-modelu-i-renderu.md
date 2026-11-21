# 07 — Wytyczne: model 3D i rendery AI (zgodność z rzeczywistością)

> Obowiązuje każdego agenta, który zmienia model (`src/model3d`, `house.default.json`) albo przygotowuje opis/prompt do renderu.
> Źródła: `materialy/zdjecia/stan-surowy/01–30` (stan 2026-11), elewacje, rzut po zmianach, mapa 03, uwagi Damiana z 2026-11-21.
> Hierarchia źródeł: **uwagi Damiana > zdjęcia > rzut po zmianach > elewacje > mapa**. Rendery z `materialy/wizja/` to kierunek wykończenia, nie stan obecny.

## 1. Zasady pracy (dlaczego ten plik powstał)
Pierwsza wersja modelu miała błędy, bo zgadywała tam, gdzie zdjęcia dawały odpowiedź (zadaszenie nad podjazdem, pełny trójkąt w szczycie, tarasy, których nie ma). Dlatego:
1. Przed zmianą modelu obejrzyj zdjęcia z tabeli w sekcji 3 dla elementu, który zmieniasz. Nie zgaduj kształtu, który widać na zdjęciu.
2. Po zmianie zrób zrzut z widoku „Od ogrodu” (ten sam kąt co zdjęcie 21) i „Dom” i porównaj obok zdjęć 21 i 16. Dołącz porównanie do raportu.
3. Każda wartość niepewna = wpis „ZAŁOŻENIE:” w `extras.assumptions` + pytanie do Damiana w raporcie. Nie dodawaj elementów „bo pasują do stylu”.
4. Stan obecny i wizja to osobne rzeczy: w stanie obecnym nie ma tarasów, cegły, palonej deski ani zadaszeń na słupach z drewna.

## 2. Bryła — fakty potwierdzone
| Element | Jak jest naprawdę | Źródło |
|---|---|---|
| Bryła główna | Parterowa, prostokąt 20,28 × 9,74 m, dach dwuspadowy, bez lukarn i okien dachowych | rzut, mapa, 05, 21 |
| Garaż | Niska bryła 7,26 × 7,12 m z **płaskim dachem z papy**, wysunięta do frontu przy szczycie sypialni; okap dachu stromego przechodzi **nad** dachem garażu | Damian, 03, 16 |
| Front obok garażu | **Brak zadaszenia** — otwarta przestrzeń przy wejściu i podjeździe | Damian |
| Dach | Blacha na rąbek, grafit; kalenica ok. +6,6/+6,9; okap ok. +3,2; komin murowany, ciemny, po stronie ogrodowej kalenicy | elewacje, 05, 21 |
| Okap podłużny | Szeroki (ok. 0,7 m), **odkryte końce krokwi**, deskowanie/OSB widoczne od spodu, rynna | 08, 13, 14, 17, 23 |
| Okap szczytowy | Wysunięty ok. 0,4–0,5 m, deska czołowa | 21, 22 |
| Ściany | Biały bloczek gazobetonowy (bez tynku), ciemny pas wieńca nad oknami, mur między krokwiami pod okapem, ciemny cokół | 05, 13, 14, 16, 21 |
| Szczyt salonu | Przeszklenie **trójkątne prostokątne na połowie szczytu od strony ogrodu**: pionowa krawędź przy kalenicy, przeciwprostokątna równoległa do połaci | Damian, 21, 29, elewacja |
| Strona ogrodowa | Od sypialni: **4 wąskie, wysokie okna do podłogi** (≈0,85 m), potem **2 duże okna FIX** salonu z filarkiem | 05, 21, 12, 24, 26 |
| Szczyt salonu (parter) | Duże okno/HS przy narożniku ogrodowym + wąskie wysokie okno/drzwi | 21, 02, 18 |
| Narożnik salonu | Przeszklenia w narożniku, betonowy słup | 18 |
| Pergola | **Betonowa rama** (słupy + belki) przy szczycie salonu, ok. 3 m od ściany; bez dachu | 21 |
| Szczyt sypialni | Szerokie okno z parapetem (sypialnia), mniejsze okna łazienek; ściana garażu od tej strony pełna | 16, 20, 28 |
| Wnętrze | Salon otwarty do dachu (widoczne krokwie, belka); pozostałe pomieszczenia ze stropem drewnianym (belki) | 02, 29, 10, 12, 24 |
| Garaż wnętrze | Strop betonowy (na zdjęciu 30 jeszcze na stemplach), drzwi na tył/bok | 09, 30 |
| Teren | Piasek i rzadka trawa, brzozy i sosny dookoła, gęsty las za działką; drewniana brama przy drodze gruntowej | 01, 04, 27 |

## 3. Które zdjęcie do którego elementu
| elementKey (prefiks) | Zdjęcia |
|---|---|
| `dom.dach.*`, `dom.komin.*` | 03, 05, 16, 21 |
| `dom.dach.skrzynia-okapowa-*`, `dom.dach.okap-*` | 08, 13, 14, 17, 22, 23 |
| `dom.sciana.pn`, `dom.okno.o-*` (ogród) | 05, 14, 21 |
| `dom.sciana.zach`, `dom.sciana.szczyt-zach`, `dom.okno.szczyt-salon` | 02, 18, 21, 22, 29 |
| `dom.sciana.wsch`, `dom.garaz.*` | 03, 09, 16, 30 |
| `dom.pergola.*` | 21 |
| `dzialka.*` | 01, 04, 27; mapa 03 |
| wnętrze (T12) | 02, 06, 07, 10, 11, 12, 15, 19, 20, 24–26, 28, 29 |
| instalacje (T14/T15) | 06, 07, 10, 15, 19, 25 (rury na posadzce, podejścia) |

## 4. Styl modelu w aplikacji
- Rysunkowo, płaskie kolory, cieniowanie toon (4 stopnie), ciemny obrys. Bez tekstur foto.
- Kolory stanu obecnego: ściany #eeeae1, dach #3a3f47, papa #5d6166, wieniec #8f8d88, krokwie #b88a55, beton #a7a59f.
- Słońce z zachodu (popołudnie, jak na zdjęciu 21), żeby strona ogrodowa i szczyt salonu były oświetlone.
- Detale tylko te, które widać z 10–30 m (krokwie okapu, wieniec, rama pergoli). Bez balustrad, rynien spustowych, parapetów.

## 5. Wytyczne do renderów AI
Rendery robi Damian osobno. Używaj zrzutów z aplikacji (widoki „Od ogrodu”, „Dom”, „Z góry”) jako **obrazu bazowego** (img2img / reference), żeby bryła się zgadzała.

### Opis domu do promptu (wklej w całości)
> Single-storey barn-style house (modern Polish "stodoła"), long rectangular volume 20 × 10 m with a steep symmetric gable roof (about 32–35°), dark graphite standing-seam metal roof, no dormers, no roof windows, one dark masonry chimney on the garden-side slope. Wide eaves (0.7 m) with exposed rafter tails on the long sides, gable overhang 0.4 m. A separate low flat-roofed garage box (7 × 7 m) attached at one gable end, projecting forward on the entrance side; the steep roof's eave passes above the garage's flat roof. Garden facade: four tall narrow floor-to-ceiling windows, then two large fixed panoramic windows of the living room. Living-room gable: a large sliding glass door near the garden corner, a narrow tall window, and above them a right-triangle glazing occupying only the garden-side half of the gable (vertical edge near the ridge, sloped edge parallel to the roof). A freestanding concrete pergola frame (posts and beams, no roof) about 3 m in front of the living-room gable. Flat sandy plot with sparse grass, surrounded by birch and pine forest, Central Poland, overcast-to-sunny autumn light.

### Wariant „stan obecny”
> walls of bare white aerated concrete blocks, grey concrete ring beam band below the eaves, dark plinth, black window frames, OSB visible under eaves, construction site, no terrace.

### Wariant „wizja” (kierunek Damiana: cegła + palona deska)
> walls in red-brown clinker brick on the ground floor, gables, eave band and the garage clad in vertical black charred timber (shou sugi ban), black window frames and black sectional garage door (RAL 7016), wooden deck terrace along the living-room gable and part of the garden side, timber posts with knee braces under a roof extension around the living-room gable.

### Negatywny prompt (czego nie ma)
> no second floor, no dormers, no skylights, no canopy or carport over the driveway or entrance, no full triangular glazing across the whole gable, no balconies, no hip roof, no red roof tiles, no stucco render (unless vision variant), no fence in front of facade, no city background.

### Kadry, które warto generować
1. „Od ogrodu” — narożnik salonu, jak zdjęcie 21 (najważniejszy).
2. Front z garażem i wejściem — z podjazdu (kierunek od bramy).
3. Szczyt sypialni z garażem — jak zdjęcie 16.
4. Widok z lotu ptaka na całą działkę (z aplikacji „Cała działka”).

## 6. Otwarte pytania (dopisuj odpowiedzi Damiana)
- Kąt dachu: 32° przyjęte — potwierdzić z przekrojem.
- Wysokość wąskich okien od ogrodu: do podłogi 2,25 m (zdjęcia) — szerokość 0,85 m z proporcji, rzut podaje 1,20.
- Drzwi techniczne garażu: na której ścianie (zdjęcie 16 pokazuje pełną ścianę)?
- Działka: granice i drzewa z ortofotomapy Geoportalu (`materialy/dzialka/ortofoto-geoportal-605-8.png`, skala 0,0979 m/px wg narożników A i C). Pole wychodzi ≈ 5 185 m² zamiast ≈ 4 800 m² z aktu — do kalibracji w T11. Ortofoto jest sprzed budowy: drzewa w promieniu 12 m od domu, na podjeździe i w pasie 9 m przy granicy południowej pominięte. Pytanie: czy przy domu coś jeszcze wycięto?
