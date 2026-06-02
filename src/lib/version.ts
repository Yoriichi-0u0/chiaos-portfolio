export type ChiaOSVersion = {
  fullYears: number;
  minor: number;
  progressPercent: number;
  shortLabel: string;
  label: string;
  tooltip: string;
};

const BIRTH_YEAR = 2005;
const BIRTH_MONTH_INDEX = 7;
const BIRTH_DAY = 24;

function birthdayForYear(year: number) {
  return new Date(year, BIRTH_MONTH_INDEX, BIRTH_DAY, 0, 0, 0, 0);
}

export function getChiaOSVersion(now = new Date()): ChiaOSVersion {
  const birthdayThisYear = birthdayForYear(now.getFullYear());
  const hasReachedBirthdayThisYear = now.getTime() >= birthdayThisYear.getTime();
  const fullYears =
    now.getFullYear() - BIRTH_YEAR - (hasReachedBirthdayThisYear ? 0 : 1);
  const lastBirthdayYear = hasReachedBirthdayThisYear
    ? now.getFullYear()
    : now.getFullYear() - 1;
  const lastBirthday = birthdayForYear(lastBirthdayYear);
  const nextBirthday = birthdayForYear(lastBirthdayYear + 1);
  const ageYearDuration = nextBirthday.getTime() - lastBirthday.getTime();
  const elapsed = now.getTime() - lastBirthday.getTime();
  const progressRatio = ageYearDuration > 0 ? elapsed / ageYearDuration : 0;
  const progressPercent = Math.max(0, Math.min(99, Math.floor(progressRatio * 100)));
  const minor = progressPercent;
  const shortLabel = `v${fullYears}.${minor.toString().padStart(2, "0")}`;

  return {
    fullYears,
    minor,
    progressPercent,
    shortLabel,
    label: `ChiaOS ${shortLabel}`,
    tooltip: "Version follows my real age. The system updates as I do.",
  };
}
