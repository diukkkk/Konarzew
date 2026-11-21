/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Strona jest publikowana na GitHub Pages pod adresem /Konarzew/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Konarzew/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    globals: true,
  },
});
