import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'msedge', headless: false });
const out = {};
for (const [name, reduce, noGl] of [['normal', false, false], ['reduced', true, false], ['nowebgl', false, true]]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  if (noGl) await ctx.addInitScript(() => { const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { if (/webgl/.test(String(t))) return null; return g.call(this, t, ...a); }; });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto('http://localhost:3217/system', { waitUntil: 'networkidle' });
  await page.locator('[role=tablist]').evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
  await page.waitForTimeout(1200);
  const reading = () => page.locator('#gallery-panel [aria-live=polite]').textContent();
  const r = { start: await reading(), playButtons: await page.locator('#gallery-panel button:has(svg.lucide-play), #gallery-panel button:has(svg.lucide-pause)').count() };
  if (r.playButtons) {
    const btn = page.locator('#gallery-panel button:has(svg.lucide-play), #gallery-panel button:has(svg.lucide-pause)');
    r.labelAt2025 = await btn.textContent();
    await btn.click(); await page.waitForTimeout(700);
    r.afterRestart = await reading(); r.pressedWhilePlaying = await btn.textContent();
    await btn.click(); const paused = await reading(); await page.waitForTimeout(600);
    r.pauseHolds = paused === await reading();
    await btn.click(); await page.waitForTimeout(500); r.resumedFrom = paused; r.resumed = await reading();
    await page.locator('input[type=range]').focus(); await page.keyboard.press('Home');
    r.sliderStopsPlayback = await btn.textContent(); r.afterSliderHome = await reading();
    await btn.click(); await page.locator('#gallery-tab-fingence').click(); await page.locator('#gallery-tab-earth-fm').click();
    r.tabChangeStops = await btn.textContent();
    await page.locator('input[type=range]').focus(); await page.keyboard.press('End'); await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft');
    await btn.click(); await page.waitForTimeout(1400);
    r.endsAt2025 = await reading(); r.pressedAtEnd = await btn.textContent(); r.labelAtEnd = await btn.textContent();
  } else {
    await page.locator('input[type=range]').focus(); await page.keyboard.press('Home');
    r.sliderHome = await reading(); await page.keyboard.press('PageUp'); r.sliderPageUp = await reading();
  }
  r.canvases = await page.locator('canvas').count(); r.fallback = await page.locator('.gallery-fallback').count();
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await page.screenshot({ path: `/tmp/chiaos-qa/gallery/playback-${name}.png` });
  r.errors = errors; out[name] = r; await ctx.close();
}
console.log(JSON.stringify(out, null, 1)); await browser.close();
