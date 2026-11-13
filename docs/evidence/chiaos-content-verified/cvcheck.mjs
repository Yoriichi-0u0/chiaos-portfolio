import { chromium } from "playwright";
const b = await chromium.launch();
const out = {};
for (const path of ["/", "/system"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type()==="error" && errs.push(m.text()));
  await p.goto("http://localhost:3217" + path, { waitUntil: "networkidle" });
  await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=700){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); } });
  out[path] = {
    cvLinks: await p.$$eval('a[href^="mailto:"][href*="CV%20request"]', a => a.map(x => x.textContent.trim())),
    placeholder: await p.$$eval('a[href*="placeholder"]', a => a.length),
    cgpa: (await p.textContent("body")).match(/CGPA[^.]{0,20}/g),
    errs,
  };
  await p.close();
}
const r = await (await fetch("http://localhost:3217/cv/chia-yuen-kai-cv-placeholder.pdf")).status;
console.log(JSON.stringify({ ...out, oldPdfStatus: r }, null, 1));
await b.close();
