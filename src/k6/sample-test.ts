import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { clickSlots } from '../pages/example-page';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"

export const options = {
    vus: 1,
    maxRedirects: 20,
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 2,
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
export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    }
}
