# T15 — Zdjęcia instalacji z wymiarami
**Moduł:** M12 (+M6) · **Faza:** 3 · **Zależy od:** T07, T14

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu; instalacje w ścianach mają warstwy i trasy (T14). Przed zakryciem ścian Damian robi zdjęcia instalacji i chce zapisać wymiary (np. „kabel 35 cm od narożnika, 120 cm od podłogi”). To ma działać szybko z telefonu na budowie.

## Cel
Tryb „Dokumentuj ścianę”: zdjęcie przypięte w punkcie ściany + wymiary + adnotacje na zdjęciu.

## Przeczytaj
`03` wpis `zdjecie` (`measurements`), `Pin.layer`. Raporty T07 (PhotoEditor), T14.

## Pliki (wolno)
`src/features/installations/WallDocumentation.tsx`, `src/ui/PhotoAnnotator.tsx`, `src/features/pins/editors/PhotoEditor.tsx` (rozbudowa wymiarów).

## Nie ruszaj
Typów (`Measurement` wystarcza; jeśli nie — wpis DECYZJE).

## Do zrobienia
1. Przepływ: wybierz ścianę → „Zrób zdjęcie” → wskaż punkt na ścianie → dodaj wymiary (szybkie przyciski: „od lewego narożnika”, „od podłogi”, „od sufitu”).
2. Adnotacje: strzałki i linie wymiarowe rysowane na zdjęciu (zapis jako druga wersja obrazu lub warstwa SVG w `extras` — wybierz, zapisz w DECYZJE).
3. Widok ściany „na płasko”: rzut ściany z zaznaczonymi zdjęciami i trasami.
4. Ikona aparatu w 3D w miejscu zdjęcia (w warstwie instalacji).

## Kryteria akceptacji
- K1 Z telefonu: zdjęcie + 2 wymiary + przypięcie < 30 s (ręczny test, opis w raporcie).
- K2 Widok ściany pokazuje wszystkie zdjęcia w poprawnych miejscach.
