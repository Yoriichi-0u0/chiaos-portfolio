import { chromium } from "playwright";
const b = await chromium.launch({ channel: "msedge", headless: false, args: ["--enable-gpu"] });
const out = {};
for (const mode of ["dual", "unified"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:3217/system?perf${mode === "unified" ? "&renderer=unified" : ""}`, { waitUntil: "networkidle" });
  await p.locator("[role=tablist]").evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
  await p.waitForTimeout(1500);
  await p.evaluate(() => Object.values(window.__chiaosPerf ?? {}).forEach(s => s.frames.length = 0));
  await p.waitForTimeout(3000);
  out[mode] = await p.evaluate(() => Object.fromEntries(Object.entries(window.__chiaosPerf ?? {}).map(([k, v]) => [k, v.frames.length])));
  await ctx.close();
}
console.log(JSON.stringify({ idleFramesIn3sReducedMotion: out }));
await b.close();
