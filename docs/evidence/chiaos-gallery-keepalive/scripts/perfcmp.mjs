import { chromium } from 'playwright';
const headed = process.argv.includes('--headed');
const lowpower = process.argv.includes('--lowpower');
const browser = await chromium.launch({ headless: !headed, ...(headed ? { channel: 'msedge' } : {}), args: headed ? ['--enable-gpu','--ignore-gpu-blocklist'] : ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext(lowpower ? { viewport:{width:390,height:844}, deviceScaleFactor:3, isMobile:true, hasTouch:true } : { viewport:{width:1440,height:900} });
const page = await ctx.newPage(); const errors = [];
page.on('pageerror', e => errors.push(String(e).slice(0,160)));
page.on('console', m => { if (m.type()==='error') errors.push(m.text().slice(0,140)); });
const cdp = await ctx.newCDPSession(page);
await cdp.send('Performance.enable');
if (lowpower) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.goto('http://localhost:3217/system?perf' + (process.argv.includes('--unified') ? '&renderer=unified' : '') + '', { waitUntil:'networkidle' });
const stat = (a) => { if (!a?.length) return null; const s=[...a].sort((x,y)=>x-y); const mean=a.reduce((x,y)=>x+y,0)/a.length; return { n:a.length, fps:+(1000/mean).toFixed(1), meanMs:+mean.toFixed(2), p95Ms:+s[Math.floor(s.length*0.95)].toFixed(2), maxMs:+s[s.length-1].toFixed(1), over33:a.filter(x=>x>33.4).length }; };
const metrics = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.filter(m=>['JSHeapUsedSize','ScriptDuration','TaskDuration','LayoutDuration','Nodes'].includes(m.name)).map(m=>[m.name,m.value]));
const measure = async (label, ms=4000) => {
  await page.evaluate(() => Object.values(window.__chiaosPerf ?? {}).forEach(s => s.frames.length = 0));
  const m0 = await metrics(); await page.waitForTimeout(ms); const m1 = await metrics();
  const probes = await page.evaluate(() => JSON.parse(JSON.stringify(window.__chiaosPerf ?? {})));
  return { label, canvases: await page.locator('canvas').count(),
    mainThreadBusyPct: +(((m1.TaskDuration-m0.TaskDuration)/(ms/1000))*100).toFixed(1),
    scriptPct: +(((m1.ScriptDuration-m0.ScriptDuration)/(ms/1000))*100).toFixed(1),
    heapMB: +(m1.JSHeapUsedSize/1048576).toFixed(1),
    probes: Object.fromEntries(Object.entries(probes).map(([k,v])=>[k,{...stat(v.frames), ...v.info}])) };
};
const toGallery = () => page.locator('[role=tablist]').evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70));
const out = { mode: headed ? 'headed Chromium, Apple GPU (Metal ANGLE)' : 'headless SwiftShader (software)', lowpower, gpu: await page.evaluate(() => { const c=document.createElement('canvas').getContext('webgl2'); const e=c?.getExtension('WEBGL_debug_renderer_info'); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'n/a'; }) };
out.hero = await measure('hero, director only');
await toGallery(); await page.waitForTimeout(1500);
out.galleryEarth = await measure('gallery Earth FM + director');
await page.getByRole('button', { name: /play record/i }).click();
out.playing = await measure('Earth FM playing + director', 3000);
const ids = ['fingence','bird-species-classification','sarawak-tourism-information-system','pagepilot','little-orbit','earth-fm'];
out.perArtifact = {};
for (const id of ids.slice(0,5)) { await page.locator(`#gallery-tab-${id}`).click(); await page.waitForTimeout(600); const r = await measure(id, 2000); out.perArtifact[id] = { fps: r.probes.gallery?.fps, p95Ms: r.probes.gallery?.p95Ms, calls: r.probes.gallery?.calls, tris: r.probes.gallery?.triangles, directorFps: r.probes.director?.fps, mainPct: r.mainThreadBusyPct }; }
await page.evaluate(() => window.gc?.());
const heapStart = (await metrics()).JSHeapUsedSize;
const res0 = await page.evaluate(() => window.__chiaosPerf?.gallery ? { g: window.__chiaosPerf.gallery.info.geometries, t: window.__chiaosPerf.gallery.info.textures } : null);
out.geometriesPerCycleAtEarthFm = [];
for (let cycle = 0; cycle < 10; cycle += 1) { for (const id of ids) { await page.locator(`#gallery-tab-${id}`).click(); await page.waitForTimeout(150); } await page.waitForTimeout(300); out.geometriesPerCycleAtEarthFm.push(await page.evaluate(() => window.__chiaosPerf?.gallery?.info.geometries)); }
await page.waitForTimeout(800);
const res1 = await page.evaluate(() => window.__chiaosPerf?.gallery ? { g: window.__chiaosPerf.gallery.info.geometries, t: window.__chiaosPerf.gallery.info.textures } : null);
out.switching = { cycles: 60, heapStartMB: +(heapStart/1048576).toFixed(1), heapEndMB: +((await metrics()).JSHeapUsedSize/1048576).toFixed(1), gpuResourcesBefore: res0, gpuResourcesAfter: res1 };
const remount = [];
for (let i = 0; i < 5; i += 1) {
  await page.locator('#contact').evaluate(e => e.scrollIntoView()); await page.waitForTimeout(500);
  const gone = await page.locator('canvas').count();
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.evaluate(() => { window.__drawMark = window.__chiaosGalleryDraws ?? 0; if (window.__chiaosPerf?.gallery) window.__chiaosPerf.gallery.frames.length = 0; }); const t0 = Date.now(); await toGallery();
  const ok = await page.waitForFunction(() => (window.__chiaosPerf?.gallery?.frames.length ?? 0) > 2 || (window.__chiaosGalleryDraws ?? 0) > (window.__drawMark ?? 0) + 2, null, { timeout: 30000 }).then(() => true, () => false);
  remount.push({ canvasesWhileAway: gone, firstFramesMs: ok ? Date.now() - t0 : '>30000' });
  if (!ok) break;
}
out.remount = remount;
const delays = [];
for (const id of ["fingence","earth-fm","pagepilot","earth-fm","little-orbit","earth-fm"]) { await page.waitForTimeout(400); delays.push(await page.evaluate((id) => new Promise((res) => { const el = document.getElementById("gallery-tab-" + id); const t0 = performance.now(); el.click(); requestAnimationFrame(() => requestAnimationFrame(() => res(+(performance.now() - t0).toFixed(1)))); }), id)); }
out.inputToPaintMs = delays; out.remountHeapMB = +((await metrics()).JSHeapUsedSize/1048576).toFixed(1);
await page.evaluate(() => { window.__vis = []; document.addEventListener('visibilitychange', () => window.__vis.push(document.visibilityState)); Object.values(window.__chiaosPerf ?? {}).forEach(s => { s.frames.length = 0; }); });
await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(300);
await page.evaluate(() => Object.values(window.__chiaosPerf ?? {}).forEach(s => { s.frames.length = 0; }));
await page.waitForTimeout(3000);
out.backgroundTab = await page.evaluate(() => ({ simulatedHidden: true, framesWhileHidden3s: Object.fromEntries(Object.entries(window.__chiaosPerf ?? {}).map(([k, v]) => [k, v.frames.length])) }));
await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' }); document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(500);
out.backgroundTab.framesAfterVisible = await page.evaluate(() => Object.fromEntries(Object.entries(window.__chiaosPerf ?? {}).map(([k, v]) => [k, v.frames.length])));
out.errors = errors; out.contexts = await page.locator("canvas").count();
console.log(JSON.stringify(out, null, 1));
await browser.close();
