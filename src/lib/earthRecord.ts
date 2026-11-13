export const RECORD_INNER = 0.36;
export const RECORD_OUTER = 0.94;
export const PLAYBACK_YEARS_PER_SECOND = 7;
export const ANOMALY_MIN = -0.6;
export const ANOMALY_SPAN = 2;

export function radiusForIndex(index: number, count: number) {
  return RECORD_OUTER - ((index + 0.5) / count) * (RECORD_OUTER - RECORD_INNER);
}

export function indexForRadius(radius: number, count: number): number | null {
  if (radius < RECORD_INNER || radius > RECORD_OUTER) {
    return null;
  }
  const index = Math.floor(((RECORD_OUTER - radius) / (RECORD_OUTER - RECORD_INNER)) * count);
  return Math.min(count - 1, Math.max(0, index));
}

export function encodeAnomaly(value: number) {
  return Math.round(Math.max(0, Math.min(1, (value - ANOMALY_MIN) / ANOMALY_SPAN)) * 255);
}

export function decodeAnomaly(byte: number) {
  return (byte / 255) * ANOMALY_SPAN + ANOMALY_MIN;
}

export function playbackStart(year: number, count: number) {
  return year >= count - 1 ? 0 : Math.max(0, Math.floor(year));
}

export function advancePlayhead(playhead: number, deltaSeconds: number, count: number) {
  const next = playhead + Math.max(0, deltaSeconds) * PLAYBACK_YEARS_PER_SECOND;
  if (next >= count - 1) {
    return { playhead: count - 1, ended: true };
  }
  return { playhead: next, ended: false };
}
