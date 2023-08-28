import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { clickSlots } from '../pages/example-page';

export const options = {
    vus: 10,
    maxRedirects: 20,
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            options: {
                browser: {
                    type: 'chromium',
                    headless: 'true',
                },
            },
        },
    },
    thresholds: {
        checks: ["rate==1.0"]
    }
}

export default async function () {
    const context = browser.newContext();
    let page = context.newPage();

    try {
        await Promise.all([
            await clickSlots(page)
        ])
        check(page, {
            'slots should open': (p) =>
                p.locator('#cartur').textContent() === 'Cart',
        });
    } finally {
        page.close();
    }
}
