// Wszystkie teksty interfejsu w jednym miejscu (zasada 7 w docs/plan/02-architektura.md).
export const pl = {
  appName: 'Dom Konarzew',
  nav: {
    model: 'Model',
    board: 'Tablica',
    tasks: 'Zadania',
    shopping: 'Zakupy',
    timeline: 'Oś czasu',
    settings: 'Ustawienia',
  },
  common: {
    comingSoon: 'Wkrótce',
    close: 'Zamknij',
  },
  pages: {
    model: {
      loading: 'Wczytywanie modelu 3D…',
      hint: 'Przeciągnij, aby obrócić. Kliknij element, aby go wybrać.',
      viewHouse: 'Dom',
      viewGarden: 'Od ogrodu',
      viewTop: 'Z góry',
      viewPlot: 'Cała działka',
      hideRoof: 'Ukryj dach',
      showRoof: 'Pokaż dach',
      elementKey: 'Klucz elementu',
      pinsSoon: 'Wkrótce: tutaj przypniesz notatki, zdjęcia, zadania i zakupy do tego elementu.',
      noWebgl: 'Ta przeglądarka nie może wyświetlić grafiki 3D.',
    },
    board: { description: 'Tablica pomysłów i zdjęć w stylu Pinterest.' },
    tasks: { description: 'Wszystkie zadania z całego domu w jednym miejscu.' },
    shopping: { description: 'Wspólna lista zakupów.' },
    timeline: { description: 'Przebieg budowy: etapy, daty, wykonawcy.' },
    settings: { description: 'Kopia zapasowa, wersje modelu, działka.' },
  },
} as const;
