import { chromium } from 'playwright';
const out = {};
for (const mode of ['reduced','nowebgl']) {
  const browser = await chromium.launch({ args: mode==='nowebgl' ? ['--disable-webgl','--disable-webgl2','--disable-3d-apis'] : ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
  for (const [name, opts] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}]]) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: mode==='reduced' ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage(); const errors=[];
    page.on('pageerror',e=>errors.push(String(e))); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto('http://localhost:3217/system', { waitUntil:'networkidle' });
    await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
    await page.locator('[data-gallery-stage]').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-(innerWidth>800?160:70)));
    await page.waitForTimeout(2000);
    await page.locator('[role=tab]').nth(4).click(); await page.waitForTimeout(150);
    await page.screenshot({ path:`/tmp/chiaos-qa/k-${mode}-${name}.png` });
    out[`${mode}-${name}`] = { canvases: await page.locator('canvas').count(), selected: await page.locator('[role=tab][aria-selected=true]').innerText(), overflow: await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth), errors };
    await ctx.close();
  }
  await browser.close();
}
console.log(JSON.stringify(out));
