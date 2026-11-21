import { expect, test, type Page } from '@playwright/test';
import '../../src/scene/testHooksTypes';

async function waitForScene(page: Page) {
  await page.goto('./');
  await page.waitForFunction(() => (window.__konarzew?.elementKeys().length ?? 0) > 20, null, {
    timeout: 30_000,
  });
}

async function clickElement(page: Page, key: string) {
  const pos = await page.evaluate((k) => window.__konarzew!.screenPositionOf(k), key);
  expect(pos, `element ${key} na ekranie`).not.toBeNull();
  await page.mouse.click(pos!.x, pos!.y);
}

test('scena pokazuje dom i działkę z klikalnymi elementami', async ({ page }) => {
  await waitForScene(page);
  const keys = await page.evaluate(() => window.__konarzew!.elementKeys());
  for (const k of [
    'dom.dach.polac-pd',
    'dom.dach.polac-pn',
    'dom.brama.garaz',
    'dom.taras.t1',
    'dzialka.teren',
    'dzialka.granica',
  ]) {
    expect(keys).toContain(k);
  }
});

test('K3: klik w połać dachu otwiera panel elementu', async ({ page }) => {
  await waitForScene(page);
  await clickElement(page, 'dom.dach.polac-pd');
  const panel = page.getByTestId('element-panel');
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute('data-element-key', 'dom.dach.polac-pd');
  await expect(page.getByRole('dialog', { name: 'Połać od frontu' })).toBeVisible();
  await page.getByRole('button', { name: 'Zamknij' }).click();
  await expect(page.getByTestId('element-panel')).toHaveCount(0);
});

test('„Ukryj dach” pokazuje murłatę i chowa połacie', async ({ page }) => {
  await waitForScene(page);
  await page.getByRole('button', { name: 'Ukryj dach' }).click();
  await expect
    .poll(() => page.evaluate(() => window.__konarzew!.elementKeys()))
    .toContain('dom.dach.murlata');
  const keys = await page.evaluate(() => window.__konarzew!.elementKeys());
  expect(keys).not.toContain('dom.dach.polac-pd');
  await clickElement(page, 'dom.dach.murlata');
  await expect(page.getByTestId('element-panel')).toHaveAttribute('data-element-key', 'dom.dach.murlata');
});

test('przyciski widoku nie psują sceny', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await waitForScene(page);
  for (const label of ['Z góry', 'Cała działka', 'Dom'])
    await page.getByRole('button', { name: label, exact: true }).click();
  await clickElement(page, 'dom.garaz.dach');
  await expect(page.getByTestId('element-panel')).toHaveAttribute('data-element-key', 'dom.garaz.dach');
  expect(errors).toEqual([]);
});
