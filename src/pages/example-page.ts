import type { Page } from "@playwright/test/types/test";

export async function clickSlots(page: Page) {
    await page.goto('https://empire.io/', { waitUntil: 'networkidle' })
    page.locator('//span[@data-translation="casino.menu_item.video-slots"]').click();
}