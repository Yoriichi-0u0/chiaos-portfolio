import { chromium } from 'playwright';
const name = process.argv[2];
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.goto('http://localhost:3217/system?perf', { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto';
  window.__ev = []; new PerformanceObserver(l => l.getEntries().forEach(e => { if (e.name === 'click') window.__ev.push({ start: e.startTime, delay: e.processingStart - e.startTime, proc: e.processingEnd - e.processingStart, pres: e.startTime + e.duration - e.processingEnd, dur: e.duration }); })).observe({ type: 'event', durationThreshold: 16, buffered: true });
  window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([e.startTime, e.duration]))).observe({ type: 'longtask', buffered: true }); });
await page.locator('[role=tablist]').evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
await page.waitForTimeout(3000);
const ids = ['fingence','bird-species-classification','sarawak-tourism-information-system','pagepilot','little-orbit','earth-fm'];
const raf = [];
for (let i = 0; i < 48; i++) {
  await page.waitForTimeout(350);
  raf.push(await page.evaluate((id) => new Promise(res => { const el = document.getElementById('gallery-tab-' + id); const t0 = performance.now(); el.click(); requestAnimationFrame(() => requestAnimationFrame(() => res(performance.now() - t0))); }), ids[i % 6]));
}
await page.waitForTimeout(500);
const { ev, lt } = await page.evaluate(() => ({ ev: window.__ev, lt: window.__lt }));
const info = await page.evaluate(() => Object.fromEntries(Object.entries(window.__chiaosPerf ?? {}).map(([k, v]) => [k, v.info])));
console.log(JSON.stringify({ name, raf, ev, longTasks: lt.length, info, errors }));
await browser.close();
