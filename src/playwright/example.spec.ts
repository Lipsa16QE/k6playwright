import { test, expect } from '@playwright/test';
import { clickSlots } from '../pages/example-page';

test('slots should open', async ({ page }) => {
  await clickSlots(page);

  const mainTitle = page.locator('.main-banner-title');

  await expect(mainTitle).toHaveText('100% Welcome Offer up to 1 BTC');
});