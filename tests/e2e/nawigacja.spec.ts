import { expect, test } from '@playwright/test';

const tabs = [
  { label: 'Tablica', hash: '#/tablica' },
  { label: 'Zadania', hash: '#/zadania' },
  { label: 'Zakupy', hash: '#/zakupy' },
  { label: 'Oś czasu', hash: '#/os-czasu' },
  { label: 'Ustawienia', hash: '#/ustawienia' },
  { label: 'Model', hash: '#/' },
];

test('K2: wszystkie zakładki działają', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByTestId('model-page')).toBeVisible();
  for (const { label, hash } of tabs) {
    await page.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${hash.replace('/', '\\/')}$`));
    if (label !== 'Model') await expect(page.getByRole('heading', { name: label })).toBeVisible();
  }
});

test('K3: układ zależny od szerokości, bez poziomego przewijania', async ({ page }, info) => {
  await page.goto('./');
  const nav = page.getByTestId('nav');
  const box = (await nav.boundingBox())!;
  const viewport = page.viewportSize()!;
  if (info.project.name === 'telefon') {
    expect(box.y + box.height).toBeCloseTo(viewport.height, 0); // dolny pasek
  } else {
    expect(box.x).toBe(0); // pasek boczny
    expect(box.height).toBeGreaterThan(viewport.height * 0.9);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test('panel szczegółów otwiera się i zamyka', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Szczegóły' }).click();
  await expect(page.getByRole('dialog', { name: 'Szczegóły' })).toBeVisible();
  await page.getByRole('button', { name: 'Zamknij' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
