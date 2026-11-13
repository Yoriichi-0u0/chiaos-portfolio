import { chromium } from "playwright";
const headed = process.argv.includes("--headed");
const browser = await chromium.launch({ headless: !headed, ...(headed ? { channel: "msedge" } : {}), args: headed ? ["--enable-gpu","--ignore-gpu-blocklist"] : ["--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const out = {};
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
  for (const mode of ["dual", "unified"]) {
    const { width, height, ...rest } = vp;
    const ctx = await browser.newContext({ viewport: { width, height }, ...rest });
    const page = await ctx.newPage(); const errors = [];
    page.on("pageerror", e => errors.push(String(e).slice(0, 200)));
    page.on("console", m => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    await page.goto(`http://localhost:3217/system?perf${mode === "unified" ? "&renderer=unified" : ""}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `/tmp/chiaos-qa/unified/${name}-${mode}-hero.jpg`, quality: 70 });
    await page.locator("[role=tablist]").evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `/tmp/chiaos-qa/unified/${name}-${mode}-gallery.jpg`, quality: 70 });
    await page.locator("#gallery-tab-fingence").click(); await page.waitForTimeout(800);
    await page.screenshot({ path: `/tmp/chiaos-qa/unified/${name}-${mode}-fingence.jpg`, quality: 70 });
    out[`${name}-${mode}`] = {
      canvases: await page.locator("canvas").count(),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      draws: await page.evaluate(() => window.__chiaosGalleryDraws ?? null),
      errors,
    };
    await ctx.close();
  }
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
