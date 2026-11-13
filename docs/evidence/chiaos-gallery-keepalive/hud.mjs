import { chromium } from 'playwright';
const host = process.argv[2] || 'localhost';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
const page = await ctx.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(String(e))); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto(`http://${host}:3217/system?perf`, { waitUntil:'networkidle' });
await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
await page.waitForTimeout(1500);
const to = () => page.locator('[data-gallery-stage]').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70));
await to(); await page.waitForTimeout(4000);
for (let i=0;i<2;i++){ await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await page.waitForTimeout(1500); await to(); await page.waitForTimeout(3000); }
await page.locator('[role=tab]').nth(1).tap(); await page.waitForTimeout(800);
const hud = await page.locator('[data-perf-hud]').innerText();
await page.screenshot({ path: '/tmp/chiaos-qa/hud-mobile.png' });
const plain = await browser.newPage(); await plain.goto(`http://${host}:3217/system`, { waitUntil:'networkidle' }); await plain.waitForTimeout(800);
console.log(JSON.stringify({ hud, hudWithoutPerf: await plain.locator('[data-perf-hud]').count(), errors }));
await browser.close();
