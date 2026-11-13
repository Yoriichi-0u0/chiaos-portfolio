import assert from "node:assert/strict";
import test from "node:test";
import { formatGistempReading, gistempAnnual, gistempSource } from "../src/data/gistemp.ts";
import {
  RECORD_INNER,
  RECORD_OUTER,
  advancePlayhead,
  decodeAnomaly,
  encodeAnomaly,
  indexForRadius,
  playbackStart,
  radiusForIndex,
} from "../src/lib/earthRecord.ts";

const count = gistempAnnual.length;

test("GISTEMP series covers every year from 1880 to 2025", () => {
  assert.equal(gistempSource.firstYear, 1880);
  assert.equal(gistempSource.lastYear, 2025);
  assert.equal(count, 146);
  assert.ok(gistempAnnual.every((value) => Number.isFinite(value) && Math.round(value * 100) / 100 === value));
});

test("GISTEMP spot values match the Earth FM source", () => {
  assert.equal(gistempAnnual[0], -0.18);
  assert.equal(gistempAnnual[2024 - 1880], 1.29);
  assert.equal(gistempAnnual[count - 1], 1.19);
  assert.equal(Math.max(...gistempAnnual), 1.29);
  assert.equal(formatGistempReading(0), "1880 · −0.18 °C");
  assert.equal(formatGistempReading(count - 1), "2025 · +1.19 °C");
});

test("every groove radius maps back to its own year", () => {
  for (let index = 0; index < count; index += 1) {
    const radius = radiusForIndex(index, count);
    assert.ok(radius > RECORD_INNER && radius < RECORD_OUTER);
    assert.equal(indexForRadius(radius, count), index);
  }
  assert.equal(indexForRadius(RECORD_OUTER, count), 0);
  assert.equal(indexForRadius(RECORD_INNER, count), count - 1);
  assert.equal(indexForRadius(RECORD_INNER - 0.01, count), null);
  assert.equal(indexForRadius(RECORD_OUTER + 0.01, count), null);
});

test("texture encoding keeps every anomaly within one 8-bit step", () => {
  for (const value of gistempAnnual) {
    assert.ok(Math.abs(decodeAnomaly(encodeAnomaly(value)) - value) <= 2 / 255 / 2 + 1e-9);
  }
});

test("playback restarts from 1880 at the final year and stops at 2025", () => {
  assert.equal(playbackStart(count - 1, count), 0);
  assert.equal(playbackStart(40, count), 40);
  assert.deepEqual(advancePlayhead(10, 1, count), { playhead: 17, ended: false });
  assert.deepEqual(advancePlayhead(140, 1, count), { playhead: count - 1, ended: true });
  assert.deepEqual(advancePlayhead(10, -1, count), { playhead: 10, ended: false });
});
