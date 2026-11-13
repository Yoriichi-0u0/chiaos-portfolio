import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
await page.goto('http://localhost:3217/system', { waitUntil:'networkidle' });
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 400) { await page.evaluate(v => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, v); }, y); await page.waitForTimeout(400); }
await page.waitForTimeout(800);
console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => getComputedStyle(el).opacity === '0' && el.textContent.trim().length > 20 && el.getBoundingClientRect().height > 40).map(el => el.tagName + ':' + el.textContent.trim().slice(0,40)))));
await browser.close();
