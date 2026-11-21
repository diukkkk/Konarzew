// Typy pomocnika testów e2e (window.__konarzew). Współdzielone przez aplikację i testy Playwright.
declare global {
  interface Window {
    __konarzew?: {
      /** Środek elementu na ekranie (piksele w oknie) — dla testów automatycznych. */
      screenPositionOf: (elementKey: string) => { x: number; y: number } | null;
      elementKeys: () => string[];
    };
  }
}

export {};
