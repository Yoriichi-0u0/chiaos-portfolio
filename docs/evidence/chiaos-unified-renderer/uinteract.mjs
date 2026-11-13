import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "msedge", headless: false, args: ["--enable-gpu"] });
const out = {};
async function run(label, ctxOpts, query, initScript) {
  const ctx = await browser.newContext(ctxOpts);
  if (initScript) await ctx.addInitScript(initScript);
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", e => errors.push(String(e).slice(0, 160)));
  page.on("console", m => m.type() === "error" && errors.push(m.text().slice(0, 160)));
  await page.goto(`http://localhost:3217/system${query}`, { waitUntil: "networkidle" });
  await page.locator("[role=tablist]").evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
  await page.waitForTimeout(1200);
  const r = { canvases: await page.locator("canvas").count() };
  const reading = () => page.locator("#gallery-panel [aria-live=polite]").textContent();
  const tab = page.locator("#gallery-tab-earth-fm"); await tab.focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  r.keyboardTab = await page.evaluate(() => document.activeElement?.id + "|" + document.activeElement?.getAttribute("aria-selected"));
  await page.keyboard.press("Home");
  r.homeTab = await page.evaluate(() => document.activeElement?.id);
  await page.waitForTimeout(400);
  const slider = page.locator('input[type=range]');
  await slider.fill("10"); r.sliderReading = await reading();
  const play = page.getByRole("button", { name: /play record|pause record/i });
  r.playVisible = await play.count();
  if (r.playVisible) { await play.click(); await page.waitForTimeout(1500); r.afterPlay = await reading(); await play.click(); }
  const stage = await page.locator("[data-gallery-stage]").boundingBox();
  await slider.fill("100"); const before = await reading();
  await page.mouse.move(stage.x + stage.width * 0.5, stage.y + stage.height * 0.5);
  for (let i = 0; i < 12; i++) { await page.mouse.move(stage.x + stage.width * (0.5 + i * 0.012), stage.y + stage.height * (0.47 + i * 0.008)); await page.waitForTimeout(40); }
  r.hoverScrub = `${before} -> ${await reading()}`;
  await page.mouse.move(stage.x + 60, stage.y + 60); await page.mouse.down(); await page.mouse.move(stage.x + 260, stage.y + 120, { steps: 8 }); await page.mouse.up();
  const box = await page.locator("[data-gallery-stage]").evaluate(e => { const p = e.parentElement.lastElementChild.getBoundingClientRect(); return document.elementFromPoint(p.left + 30, p.top + 30)?.tagName; });
  r.panelTopElement = box;
  r.overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  r.hidden = await page.evaluate(() => [...document.querySelectorAll("main h2, main h3, main p")].filter(e => { const s = getComputedStyle(e); return e.getBoundingClientRect().height > 0 && (+s.opacity < 0.05 || s.visibility === "hidden"); }).length);
  await page.screenshot({ path: `/tmp/chiaos-qa/unified/${label}.jpg`, quality: 65 });
  r.errors = errors; out[label] = r; await ctx.close();
}
await run("dual-desktop", { viewport: { width: 1440, height: 900 } }, "");
await run("unified-desktop", { viewport: { width: 1440, height: 900 } }, "?renderer=unified");
await run("unified-tablet", { viewport: { width: 820, height: 1180 } }, "?renderer=unified");
await run("unified-reduced", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }, "?renderer=unified");
await run("unified-nowebgl", { viewport: { width: 390, height: 844 } }, "?renderer=unified", () => { const o = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { return /webgl/.test(t) ? null : o.call(this, t, ...a); }; });
console.log(JSON.stringify(out, null, 1));
await browser.close();
