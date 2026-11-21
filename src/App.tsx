import { HashRouter, Route, Routes } from 'react-router-dom';
import { BoardPage } from './features/board/BoardPage';
import { ModelPage } from './features/model/ModelPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { ShoppingPage } from './features/shopping/ShoppingPage';
import { TasksPage } from './features/tasks/TasksPage';
import { TimelinePage } from './features/timeline/TimelinePage';
import { Layout } from './ui/Layout';

// HashRouter: adresy typu /#/zakupy działają na GitHub Pages bez dodatkowej konfiguracji serwera.
export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ModelPage />} />
          <Route path="tablica" element={<BoardPage />} />
          <Route path="zadania" element={<TasksPage />} />
          <Route path="zakupy" element={<ShoppingPage />} />
          <Route path="os-czasu" element={<TimelinePage />} />
          <Route path="ustawienia" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
