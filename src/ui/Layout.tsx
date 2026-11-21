import { NavLink, Outlet } from 'react-router-dom';
import { pl } from '../i18n/pl';
import { navItems } from '../routes';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs font-medium lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3 lg:text-base ${
    isActive ? 'bg-amber-100 text-amber-900' : 'text-stone-600 hover:bg-stone-100'
  }`;

/** Układ: pasek boczny na komputerze (≥1024 px), dolny pasek na telefonie. */
export function Layout() {
  return (
    <div className="flex h-dvh flex-col bg-stone-50 text-stone-900 lg:flex-row">
      <nav
        aria-label="Nawigacja główna"
        data-testid="nav"
        className="order-last grid h-16 shrink-0 grid-cols-6 gap-1 border-t border-stone-200 bg-white px-1 py-1 lg:order-first lg:flex lg:h-auto lg:w-60 lg:flex-col lg:border-t-0 lg:border-r lg:p-3"
      >
        <div className="mb-4 hidden px-4 py-2 text-xl font-bold lg:block">{pl.appName}</div>
        {navItems.map(({ path, label, Icon }) => (
          <NavLink key={path} to={path} end={path === '/'} className={linkClass}>
            <Icon className="h-6 w-6 shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="relative min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
