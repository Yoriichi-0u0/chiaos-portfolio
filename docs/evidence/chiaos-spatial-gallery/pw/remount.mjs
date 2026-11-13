import { chromium } from 'playwright';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.goto('http://localhost:3217/system?perf', { waitUntil:'networkidle' });
const state = () => page.evaluate(() => ({ y: Math.round(scrollY), canvases: document.querySelectorAll('canvas').length, stageTop: Math.round(document.querySelector('[role=tablist]').getBoundingClientRect().top), galleryFrames: window.__chiaosPerf?.gallery?.frames.length ?? null }));
const toGallery = () => page.locator('[role=tablist]').evaluate(e => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70); });
await toGallery(); await page.waitForTimeout(3000); const first = await state();
await page.locator('#contact').evaluate(e => e.scrollIntoView()); await page.waitForTimeout(2000); const away = await state();
const t0 = Date.now(); await toGallery(); const log = [];
for (let i = 0; i < 10; i += 1) { await page.waitForTimeout(1000); log.push({ t: Date.now()-t0, ...(await state()) }); }
console.log(JSON.stringify({ first, away, log })); await browser.close();
