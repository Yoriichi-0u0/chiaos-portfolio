import { chromium } from 'playwright';
const tag = process.argv[2] || 'before';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const out = {};
for (const [name, opts] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}]]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(String(e))); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto('http://localhost:3217/system', { waitUntil:'networkidle' });
  await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
  await page.waitForTimeout(2500);
  await page.screenshot({ path:`/tmp/chiaos-qa/k-${tag}-${name}-hero.png` });
  await page.locator('[data-gallery-stage]').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-(innerWidth>800?160:70)));
  await page.waitForTimeout(2500);
  for (const i of [0,1,4]) { await page.locator('[role=tab]').nth(i).click(); await page.waitForTimeout(1800); await page.screenshot({ path:`/tmp/chiaos-qa/k-${tag}-${name}-tab${i}.png` }); }
  out[name] = { errors, overflow: await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth) };
  await ctx.close();
}
console.log(JSON.stringify(out)); await browser.close();
