import type { MaterialId } from '../model3d/types';

/** Paleta stylu rysunkowego: płaskie, lekko nasycone kolory. Stan obecny: biały bloczek + grafitowy dach. */
export const palette: Record<MaterialId, string> = {
  sciana: '#eeeae1',
  'sciana-garaz': '#e6e1d6',
  dach: '#3a3f47',
  obrobka: '#2c3036',
  szklo: '#5b7a99',
  drzwi: '#3b3f45',
  brama: '#4a4f57',
  beton: '#a7a59f',
  cokol: '#6d6a64',
  taras: '#b07a4a',
  murlata: '#c9964f',
  okolica: '#8fae5a',
  dzialka: '#a9c96b',
  granica: '#f2f2ee',
  podjazd: '#b9b3a6',
  oczyszczalnia: '#c7b27a',
  'pien-brzoza': '#efece4',
  'pien-sosna': '#7a5236',
  'korona-brzoza': '#9cc451',
  'korona-sosna': '#3f7448',
};

export const accent = '#f59e0b';
export const outline = '#1f2328';
