import { render, screen } from '@testing-library/react';
import { App } from './App';
import { pl } from './i18n/pl';

// WebGL nie działa w jsdom — scena 3D jest testowana w Playwright.
vi.mock('./scene/Scene', () => ({ default: () => null }));

describe('App', () => {
  it('pokazuje wszystkie zakładki nawigacji po polsku', () => {
    render(<App />);
    for (const label of Object.values(pl.nav)) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });

  it('domyślnie otwiera widok Model', () => {
    render(<App />);
    expect(screen.getByTestId('model-page')).toBeInTheDocument();
  });
});
