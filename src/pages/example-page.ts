import type { Page } from "@playwright/test/types/test";

export async function clickSlots(page: Page) {
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'networkidle' })
    page.locator('#cartur').click();
}