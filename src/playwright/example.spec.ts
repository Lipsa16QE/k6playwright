import { test, expect } from '@playwright/test';
import { clickSlots } from '../pages/example-page';

test('slots should open', async ({ page }) => {
  await clickSlots(page);

  const mainTitle = page.locator('#cartur');

  await expect(mainTitle).toHaveText('Cart');
});