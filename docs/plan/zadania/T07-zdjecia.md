# T07 — Zdjęcia i pomysły (media)

**Moduł:** M6 · **Faza:** 1 · **Zależy od:** T02 · **Odblokowuje:** T09, T11, T15, T16

## Kontekst w 3 zdaniach

Aplikacja webowa (PL) do budowy domu; do elementów modelu 3D przypina się pinezki z wpisami. Zdjęcia z telefonu (z budowy, inspiracje) to najczęstszy wpis; trzymane są w przeglądarce (IndexedDB), później w chmurze. Pomysł = kafelek mood boardu (zdjęcia + link + opis).

## Cel

Zapis zdjęć z kompresją i miniaturą, wpisy typu `zdjecie` i `pomysl`, galeria/podgląd pełnoekranowy, wspólne komponenty zdjęć.

## Przeczytaj

`03` sekcje `MediaFile`, wpisy `zdjecie`/`pomysl`, tabela `blobs`; `DECYZJE` Z-4. Raport T02 (API `media`).

## Pliki (wolno)

`src/data/repos/media.ts` (rozbudowa), `src/ui/PhotoPicker.tsx`, `PhotoGrid.tsx`, `PhotoViewer.tsx`, `src/features/pins/editors/PhotoEditor.tsx`, `IdeaEditor.tsx` (jeśli T06 już istnieje; inaczej same komponenty + rejestracja edytorów zgodnie z jego API — sprawdź STATUS).

## Nie ruszaj

`src/core/types.ts` bez wpisu DECYZJE; scena 3D.

## Do zrobienia

1. `saveMedia(file)`: kompresja do 2560 px/jakość 0,85 (JPEG/WebP), miniatura 400 px, odczyt wymiarów, zapis obu Blobów, zwrot `MediaFile`. PDF zapisuj bez zmian (miniatura = ikona) — przyda się w T16.
2. `getMediaUrl` z cache `URL.createObjectURL` i zwalnianiem.
3. `PhotoPicker`: wybór wielu plików, na telefonie aparat (`accept="image/*"`, `capture` opcjonalnie), wklejanie ze schowka i przeciąganie na desktopie.
4. Edytor zdjęcia: podpis; wymiary (`measurements`) jako prosta lista „etykieta / cm / od czego” (rozbudowa w T15).
5. Edytor pomysłu: zdjęcia + link + notatka + tagi.
6. `PhotoViewer`: pełny ekran, przesuwanie palcem, zoom.
7. Informacja o zajętym miejscu (`navigator.storage.estimate`) w Ustawieniach + `navigator.storage.persist()`.

## Kryteria akceptacji

- K1 Zdjęcie 12 MP z telefonu zapisuje się < 3 s, zajmuje < 1 MB (test na pliku przykładowym).
- K2 Miniatury w siatce, pełny podgląd po kliknięciu.
- K3 Usunięcie wpisu ze zdjęciem usuwa miękko `MediaFile`; Bloby czyszczone przy „Opróżnij kosz” (Ustawienia).
- K4 Eksport kopii (T02) zawiera zdjęcia (test).
