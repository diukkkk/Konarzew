import { pl } from './i18n/pl';
import { IconBoard, IconModel, IconSettings, IconShopping, IconTasks, IconTimeline } from './ui/icons';

/** Lista widoków aplikacji. Nowy widok = nowa pozycja tutaj + trasa w App.tsx. */
export const navItems = [
  { path: '/', label: pl.nav.model, Icon: IconModel },
  { path: '/tablica', label: pl.nav.board, Icon: IconBoard },
  { path: '/zadania', label: pl.nav.tasks, Icon: IconTasks },
  { path: '/zakupy', label: pl.nav.shopping, Icon: IconShopping },
  { path: '/os-czasu', label: pl.nav.timeline, Icon: IconTimeline },
  { path: '/ustawienia', label: pl.nav.settings, Icon: IconSettings },
] as const;
