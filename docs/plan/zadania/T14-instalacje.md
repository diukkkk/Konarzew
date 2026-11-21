# T14 — Warstwy instalacji: rysowanie tras
**Moduł:** M12 · **Faza:** 3 · **Zależy od:** T12, T13 · **Odblokowuje:** T15

## Kontekst w 3 zdaniach
Aplikacja webowa (PL) do budowy domu z modelem 3D (z wnętrzem). Damian chce zapisać, którędy biegną w ścianach i podłogach instalacje: woda, prąd, kanalizacja, CO, wentylacja, smart home/kamery — żeby za lata wiedzieć, gdzie wiercić. Trasy należą do wersji „stan aktualny”, bo opisują to, co fizycznie jest.

## Cel
Warstwy włączane/wyłączane, rysowanie i edycja tras po powierzchniach, punkty (gniazdka, wypusty, zawory, kamery).

## Przeczytaj
**`07-wytyczne-modelu-i-renderu.md` (obowiązkowo — fakty ze zdjęć i lista zdjęć do Twoich elementów).** `03` sekcje `InstallationRoute`, `Layer`. `02` `viewStore.visibleLayers`. Raporty T12, T13.

## Pliki (wolno)
`src/model3d/installations/**`, `src/scene/LayerView.tsx`, `src/scene/RouteDrawTool.tsx`, `src/features/installations/**`, `src/data/repos/routes.ts`, `scene/palette.ts` (kolory warstw).

## Nie ruszaj
Generatora domu; `Layer` w core bez wpisu DECYZJE.

## Do zrobienia
1. Panel warstw: przełączniki z kolorami (woda niebieski, prąd żółty, kanalizacja brązowy, CO czerwony, wentylacja szary, smart fioletowy, kamery czarny).
2. Narzędzie rysowania: klik kolejnych punktów na ścianie/podłodze (przyciąganie do siatki 5 cm i do pion/poziom), zakończ dwuklikiem; zapis `surfaceKeys`.
3. Trasy renderowane jako rurki (grubość wg warstwy), widoczne „przez” ściany w trybie warstw (ściany półprzezroczyste).
4. Punkty instalacyjne (gniazdo, włącznik, wypust, zawór, kamera) jako `Pin` z `layer` i ikoną.
5. Klik w trasę → panel z nazwą, notatką, powiązaną pinezką (zdjęcia w T15).

## Kryteria akceptacji
- K1 Trasa narysowana na ścianie pozostaje na ścianie po odświeżeniu, z właściwymi `surfaceKeys`.
- K2 Wyłączenie warstwy ukrywa trasy i punkty tej warstwy.
- K3 Rysowanie działa na tablecie (dotyk).
