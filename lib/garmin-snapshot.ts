/**
 * Aggregated from a local Garmin export (sanitized — no account identifiers).
 * Update this file when you refresh your export.
 */
export const GARMIN_DATA_AS_OF = "2026-03-23";

export const trainingVolume12wEnding2026_04_17 = {
  windowLabel: "12 weeks ending Apr 17, 2026",
  totalMinutes: 2051,
  bySportMinutes: {
    cycling: 1255,
    running: 611,
    swimming: 100,
    training: 84,
  },
};

export const trainingVolume28dEnding2026_04_17 = {
  windowLabel: "28 days ending Apr 17, 2026",
  sessionCount: 2,
  totalMinutes: 99,
  bySportMinutes: {
    swimming: 48,
    running: 51,
  },
  note:
    "Very few sessions in this window in the export—treat 12-week mix as the main volume signal.",
};

export const thresholds = {
  lactateThresholdHeartRate: 188,
  functionalThresholdPower: 139,
  maxHeartRate: 203,
  restingHeartRate: 60,
  heartRateZones: {
    z1: "≤121",
    z2: "122–141",
    z3: "142–161",
    z4: "162–182",
    z5: "183+",
  },
};

export const trainingReadinessLatest = {
  date: "2026-03-23",
  score: 77,
  level: "HIGH" as const,
  feedbackShort: "WELL_RECOVERED",
  factors: [
    { name: "Sleep score", percent: 91, label: "VERY_GOOD" },
    { name: "Recovery time", percent: 100, label: "VERY_GOOD" },
    { name: "Acute:chronic load", percent: 100, label: "VERY_GOOD" },
    { name: "HRV", percent: 97, label: "GOOD" },
    { name: "Sleep history", percent: 70, label: "GOOD" },
    { name: "Stress history", percent: 0, label: "—" },
  ],
  acuteLoad: 330,
  hrvWeeklyAverage: 81,
};

export const fitnessAgeLatest = {
  asOfDate: "2026-03-23",
  chronologicalAge: 25,
  fitnessAge: 20.8,
  restingHeartRate: 54,
  vo2Max: 44.9,
  bmi: 20.4,
};

export const healthStatusLatest = {
  date: "2026-03-23",
  metrics: [
    { type: "HRV", value: 84, status: "IN_RANGE" as const, percent: 65 },
    { type: "Resting HR", value: 56, status: "IN_RANGE" as const, percent: 29 },
    { type: "Respiration", value: 12.9, status: "IN_RANGE" as const, percent: 32 },
  ],
};

export const racePredictionsLatest = {
  date: "2026-03-23",
  raceTime5KSec: 1326,
  raceTime10KSec: 2891,
  raceTimeHalfSec: 6672,
};

export function formatRace(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const tailoringSummary =
  "Your recent training skews heavily to the bike with comparatively little swimming. This plan bumps swim frequency early, keeps run intensity anchored to your LTHR (~188 bpm), and uses FTP (~139 W) language on the bike.";
