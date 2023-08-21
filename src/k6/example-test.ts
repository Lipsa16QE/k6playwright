import { check } from 'k6';
import { Options } from 'k6/options';
import { chromium } from 'k6/experimental/browser';
import { clickSlots } from '../pages/example-page';


export let options: Options = {
    vus: 1,
    duration: '10s'
};

export default async function () {
    const browser = chromium.launch({
        headless: true, args: ['no-sandbox']
    });
    const context = browser.newContext();
    const page = context.newPage();
    try {
        await clickSlots(page);
        check(page, {
            'slots should open': (p) =>
                p.locator('.main-banner-title').textContent() === '100% Welcome Offer up to 1 BTC',
        });
    } finally {
        page.close();
        browser.close();
    }
};