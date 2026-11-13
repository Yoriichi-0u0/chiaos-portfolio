import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const sourceFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });

const files = sourceFiles("src").map((path) => [path, readFileSync(path, "utf8")]);

test("CGPA is defined only in education data", () => {
  const offenders = files
    .filter(([path]) => path !== join("src", "data", "education.ts"))
    .filter(([, text]) => /CGPA[^"`\n]*\d\.\d{2}/.test(text))
    .map(([path]) => path);
  assert.deepEqual(offenders, []);
});

test("no UI links to a placeholder CV", () => {
  const offenders = files.filter(([, text]) => text.includes("cv-placeholder")).map(([path]) => path);
  assert.deepEqual(offenders, []);
});

test("unresolved and inferred facts carry a note", () => {
  const experience = readFileSync("src/data/experience.ts", "utf8");
  const education = readFileSync("src/data/education.ts", "utf8");
  assert.match(experience, /startDate: "May 2023",\s*startDateNote:\s*"Unresolved/);
  assert.match(education, /currentStageSource:\s*"Inferred/);
});
