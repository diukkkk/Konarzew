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
      placeholder: 'Tu pojawi się model 3D domu.',
      details: 'Szczegóły',
      detailsEmpty: 'Kliknij element modelu, aby zobaczyć jego pinezki.',
    },
    board: { description: 'Tablica pomysłów i zdjęć w stylu Pinterest.' },
    tasks: { description: 'Wszystkie zadania z całego domu w jednym miejscu.' },
    shopping: { description: 'Wspólna lista zakupów.' },
    timeline: { description: 'Przebieg budowy: etapy, daty, wykonawcy.' },
    settings: { description: 'Kopia zapasowa, wersje modelu, działka.' },
  },
} as const;
