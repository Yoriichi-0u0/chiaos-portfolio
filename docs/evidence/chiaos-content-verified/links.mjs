import { chromium } from 'playwright';
import { missions } from '/Users/chiayuenkai/Documents/ChiaOS/src/data/missions.ts';
const external = new Set();
for (const mission of missions) for (const link of [{ href: mission.href }, ...(mission.links ?? [])]) if (link.href.startsWith('http')) external.add(link.href);
const results = {};
for (const url of external) {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 ChiaOS-link-check' } });
    results[url] = `${response.status}${response.url !== url ? ` -> ${response.url}` : ''}`;
  } catch (error) { results[url] = `ERROR ${error.message}`; }
}
const browser = await chromium.launch();
const out = { external: results, pages: {} };
for (const [name, path] of [['landing', '/'], ['system', '/system']]) {
  for (const [vw, vh] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: vw, height: vh } });
    const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
    await page.goto(`http://localhost:3217${path}`, { waitUntil: 'networkidle' });
    const info = await page.evaluate(() => {
      const ids = new Set([...document.querySelectorAll('[id]')].map(el => el.id));
      const brokenHash = [...document.querySelectorAll('a[href^="#"], a[href*="/#"], a[href^="/system#"]')].map(a => a.getAttribute('href')).filter(h => { const id = h.split('#')[1]; return id && h.startsWith('#') && !ids.has(id); });
      const contactMissions = [...document.querySelectorAll('article a[href="#contact"]')].length;
      const imgs = [...document.querySelectorAll('img')].map(i => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt'), ok: i.complete }));
      return { brokenHash: [...new Set(brokenHash)], contactMissions, imgsMissingAlt: imgs.filter(i => !i.alt).map(i => i.src), screenshots: imgs.filter(i => i.src?.startsWith('/screenshots')).length, overflow: document.documentElement.scrollWidth - innerWidth, og: document.querySelector('meta[property="og:image"]')?.content, twitter: document.querySelector('meta[name="twitter:image"]')?.content, stage: document.body.innerText.match(/Year 3, Semester 1[^\n]*/)?.[0], cgpa: document.body.innerText.match(/CGPA 3\.5\d[^\n]*/)?.[0] };
    });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(1500);
    info.lazyImagesLoaded = await page.evaluate(() => [...document.querySelectorAll('img[src^="/screenshots"]')].map(i => i.naturalWidth));
    if (vw === 1440) await page.screenshot({ path: `/tmp/chiaos-qa/gallery/content-${name}.png`, fullPage: false });
    out.pages[`${name}-${vw}`] = { ...info, errors };
    await page.close();
  }
}
for (const asset of ['/opengraph-image.png', '/twitter-image.png', '/screenshots/pagepilot.webp']) {
  const response = await fetch(`http://localhost:3217${asset}`); out.pages[asset] = `${response.status} ${response.headers.get('content-type')}`;
}
await browser.close(); console.log(JSON.stringify(out, null, 1));
