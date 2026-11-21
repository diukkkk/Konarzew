import { defineConfig, devices } from '@playwright/test';

// PW_CHROMIUM_PATH pozwala użyć przeglądarki zainstalowanej w systemie (np. w środowisku agenta).
const executablePath = process.env.PW_CHROMIUM_PATH;
// WebGL bez karty graficznej (CI, środowisko agenta).
const gpuArgs = ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'];

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/Konarzew/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: 'http://localhost:4173/Konarzew/', trace: 'off', launchOptions: { executablePath } },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath, args: gpuArgs } } },
    { name: 'telefon', use: { ...devices['Pixel 7'], launchOptions: { executablePath, args: gpuArgs } } },
  ],
});
