import type { Activity, ActivityTemplate } from "./efa-types";
import { thresholds, trainingVolume12wEnding2026_04_17 } from "./garmin-snapshot";

export const PLAN_START = "2026-04-13";
export const RACE_DATE = "2026-06-07";
export const RACE_LABEL = "Escape from Alcatraz · San Francisco";

function mondayFirstWeekday(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function eachDateInclusive(fromIso: string, toIso: string): string[] {
  const from = parseLocalDate(fromIso);
  const to = parseLocalDate(toIso);
  const out: string[] = [];
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    out.push(formatLocalDate(d));
  }
  return out;
}

type WeekGrid = ActivityTemplate[][];

const w = (
  cells: [
    ActivityTemplate[],
    ActivityTemplate[],
    ActivityTemplate[],
    ActivityTemplate[],
    ActivityTemplate[],
    ActivityTemplate[],
    ActivityTemplate[],
  ],
): WeekGrid => cells;

const WEEKS: WeekGrid[] = [
  w([
    [
      {
        discipline: "swim",
        title: "Technique + aerobic base",
        details:
          "Warm-up easy. Drills: catch-up, fist, single-arm. Main: 8–12 × 100 best average on :20 rest, build last 25. Cool-down. Optional: cold shower finish for acclimation.",
        durationMin: 55,
      },
    ],
    [
      {
        discipline: "run",
        title: "Aerobic run (flat)",
        details:
          "Zone 2 conversational pace. Focus on cadence ~170–180 and relaxed shoulders. Soft surface if possible.",
        durationMin: 45,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Endurance · rolling terrain",
        details:
          "Steady Zone 2. Include 4–6 × 3 min low-cadence hills (55–65 rpm) with full recovery between.",
        durationMin: 75,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Open-water prep · pool",
        details:
          "Sets without walls: turn 2–3 lanes early, sight every 6–8 strokes. 3 × 400 steady, sighting pattern consistent.",
        durationMin: 45,
      },
      {
        discipline: "run",
        title: "Post-swim brick run",
        details: "10–15 min very easy off the bike equivalent: run immediately after swim at pool exit. Mimic transition neuromuscular feel.",
        durationMin: 15,
      },
    ],
    [
      {
        discipline: "run",
        title: "Rest / mobility",
        details: "Walk, light yoga, or 20 min spin easy. Foam roll calves, hips, Thoracic spine.",
        durationMin: 30,
      },
    ],
    [
      {
        discipline: "run",
        title: "Hill strength run",
        details:
          "Warm-up 15 min. 8–10 × 45–60 sec hills at 5K effort, jog down. Cool-down. Strong but not race-pace sprint.",
        durationMin: 65,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Long steady ride",
        details:
          "Zone 2 endurance with one block of tempo (Zone 3) 2 × 12 min. Practice eating and drinking on schedule.",
        durationMin: 120,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "swim",
        title: "Threshold intervals",
        details: "400 warm-up. 6 × 200 at comfortably hard on :30–:40 rest. 200 cool-down. Keep stroke rate stable under fatigue.",
        durationMin: 60,
      },
    ],
    [
      {
        discipline: "run",
        title: "Aerobic + strides",
        details: "40 min Zone 2, then 6 × 20 sec relaxed strides with full walk-back recovery.",
        durationMin: 50,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Sweet-spot strength",
        details: "15 min warm-up. 3 × 12 min at high Zone 3 / low Zone 4 on rolling course, 5 min easy between.",
        durationMin: 75,
      },
    ],
    [
      {
        discipline: "brick",
        title: "Bike → run brick · short",
        details:
          "Bike 40 min with 5 × 2 min harder surges. Run off 12–15 min steady Zone 2. This teaches leg turnover after riding.",
        durationMin: 60,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Recovery swim",
        details: "Easy 30–40 min with emphasis on catch feel and breathing rhythm. Optional pull buoy for form.",
        durationMin: 40,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Open water practice (bay or OW if access)",
        details:
          "Wetsuit if race-legal for you. Mass-start simulation: 3 × 400 loops with tight turns and sighting. If pool only: repeat earlier OW sim.",
        durationMin: 70,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Hill repeats",
        details: "8–10 × 2–3 min climbing at 10K bike effort, easy spin-down. If windy, ride aerobar sections into wind.",
        durationMin: 90,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "run",
        title: "Trail or mixed surface",
        details:
          "Include uneven footing and short steep ups. Mind ankles—keep turnover quick on flats after hills.",
        durationMin: 55,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Race-pace broken 1500m equivalents",
        details: "After warm-up: 10 × 150 at race effort on :15–:20, hold form on last reps.",
        durationMin: 65,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Tempo + cadence",
        details: "2 × 20 min Zone 3–4 with 2 × 5 min cadence work (95–105 rpm) embedded. Aero comfort focus.",
        durationMin: 85,
      },
    ],
    [
      {
        discipline: "run",
        title: "Stairs & strength · Lyon-style prep",
        details:
          "Find long stair segments. 5–8 × 2–3 min stair climbs hard, walk/jog down. Finish 15 min flat easy. Respect knees.",
        durationMin: 55,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Easy recovery swim",
        details: "Easy volume. Technique-oriented only.",
        durationMin: 35,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Long ride with wind segments",
        details:
          "2.5–3 h Zone 2 including a 45 min block into headwind or big gear steady to mimic GG bridge exposure.",
        durationMin: 180,
      },
    ],
    [
      {
        discipline: "run",
        title: "Long run (progression finish)",
        details:
          "80–95 min: first 2/3 easy, last 1/3 steady—not race pace, but strong and controlled.",
        durationMin: 90,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "swim",
        title: "Speed endurance",
        details: "20 × 100 strong on :10 rest, negative split pattern on each 100 if possible. Finish 200 easy.",
        durationMin: 70,
      },
    ],
    [
      {
        discipline: "bike",
        title: "VO2 micro-intervals",
        details: "Warm-up. 3 sets of 5 × 1 min hard / 1 min easy. Full set recovery between. Cool-down long easy.",
        durationMin: 75,
      },
    ],
    [
      {
        discipline: "run",
        title: "Threshold / cruise intervals",
        details: "15 min warm-up. 4–5 × 6 min at half-marathon effort on 90 sec jog. Cool-down.",
        durationMin: 60,
      },
    ],
    [
      {
        discipline: "brick",
        title: "Race-specific brick",
        details:
          "Bike 50 min Z2–Z3 mix, run 25 min including 6 × 30 sec slightly faster pickups. Practice fueling bike-to-run.",
        durationMin: 85,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Recovery swim",
        details: "Easy aerobic swim, optional snorkel drills for front balance.",
        durationMin: 40,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Group ride or Solo tempo",
        details: "Race-like pushes in pack legal/safe OR 2 × 25 min tempo if solo.",
        durationMin: 120,
      },
    ],
    [
      {
        discipline: "swim",
        title: "OW dress rehearsal (if possible)",
        details:
          "Cold water and wetsuit. Practice sighting to landmarks, bilateral breathing, drafting practice with partner.",
        durationMin: 75,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "run",
        title: "Short intervals + terrain",
        details: "12 × 400m or 90 sec on 90 sec jog, on hills or track. Finish 10 min easy.",
        durationMin: 55,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Over-under climbs",
        details: "6 × 4 min: 2 min over threshold / 2 min just below, long easy between sets.",
        durationMin: 85,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Quality aerobic swim",
        details: "3 × 600 strong-steady, negative split within each rep.",
        durationMin: 60,
      },
    ],
    [
      {
        discipline: "brick",
        title: "Comprehensive brick",
        details: "Bike 60 min with final 15 at target bike effort. Run 30 min, last 10 min at target run effort.",
        durationMin: 100,
      },
    ],
    [
      {
        discipline: "run",
        title: "Easy shake + drills",
        details: "Easy 30–40 min. A-skips, light strides. Keep legs springy.",
        durationMin: 40,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Endurance + skill",
        details: "Moderate long ride with bottle grabs, corners, and out-of-saddle surges every 15 min × 6.",
        durationMin: 150,
      },
    ],
    [
      {
        discipline: "run",
        title: "Beach or soft-sand option",
        details: "If accessible: 40–50 min with 4 × 3 min sand running segments. Otherwise trail.",
        durationMin: 50,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "swim",
        title: "Peak swim block",
        details: "Warm-up. 3 × 400 at race effort + :45 rest, last rep best form. 300 easy.",
        durationMin: 75,
      },
    ],
    [
      {
        discipline: "run",
        title: "Hill + flats blend",
        details: "70 min rolling terrain. Include 10 × 60 sec strong in second half.",
        durationMin: 70,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Climbing repeats",
        details: "10 × 3 min strong seated climbs (or wind equivalents), 2 min easy between.",
        durationMin: 95,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Technique + speed touch",
        details: "Shorter session: 15 × 100 odds easy/evens build to strong, stay relaxed.",
        durationMin: 55,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Easy spin recovery",
        details: "Only light spin if legs heavy. Otherwise 45 min Z1–low Z2.",
        durationMin: 45,
      },
      {
        discipline: "run",
        title: "Easy 20 min off-bike option",
        details: "Optional brick feeling: easy jog after easy ride.",
        durationMin: 20,
      },
    ],
    [
      {
        discipline: "brick",
        title: "Peak race simulation",
        details:
          "Bike 35 min progressive, run 35 min with middle 15 at target. Dial nutrition to race plan.",
        durationMin: 95,
      },
    ],
    [
      {
        discipline: "run",
        title: "Aerobic endurance",
        details: "Long steady on tired legs acceptable but keep HR controlled. Hydrate aggressively.",
        durationMin: 105,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "swim",
        title: "Taper: feel + sharpness",
        details: "20 min easy + 8 × 50 race effort on long rest + 200 easy. Short total volume.",
        durationMin: 45,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Taper: opener",
        details: "45 min with 3 × 3 min strong, plenty easy spinning.",
        durationMin: 50,
      },
    ],
    [
      {
        discipline: "run",
        title: "Taper strides run",
        details: "35 min easy, 8 × 75 m relaxed fast with walk-back, no fatigue.",
        durationMin: 45,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Easy technique swim",
        details: "30–35 min smooth. No hard main set.",
        durationMin: 35,
      },
    ],
    [
      {
        discipline: "brick",
        title: "Short dress rehearsal",
        details: "Bike 20 min with 2 × 2 min moderate, run 12 min easy with 4 × 30 sec pickups.",
        durationMin: 40,
      },
    ],
    [
      {
        discipline: "run",
        title: "Optional easy jog",
        details: "25–30 min very easy. Or rest day.",
        durationMin: 28,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Course preview spin (optional)",
        details: "If in SF: easy spin key course sections; otherwise light trainer ride 30 min.",
        durationMin: 35,
      },
    ],
  ]),

  w([
    [
      {
        discipline: "run",
        title: "Pre-race week · mobility",
        details: "Walk + mobility. Sleep and hydration priority.",
        durationMin: 25,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Short sharp swim",
        details: "25 min: easy + 6 × 50 build, feel water speed without fatigue.",
        durationMin: 30,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Easy spin · leg check",
        details: "30 min easy with a few 30 sec spins to high cadence.",
        durationMin: 35,
      },
    ],
    [
      {
        discipline: "run",
        title: "Strides only",
        details: "15 min jog + 6 strides + warm-down. Keep spring.",
        durationMin: 28,
      },
    ],
    [
      {
        discipline: "swim",
        title: "Optional splash (15–20 min)",
        details: "Feel for water only. No intensity.",
        durationMin: 20,
      },
    ],
    [
      {
        discipline: "bike",
        title: "Rest or 20 min spin",
        details: "Choose: full rest or minimal flush.",
        durationMin: 20,
      },
    ],
    [
      {
        discipline: "brick",
        title: `${RACE_LABEL} — RACE DAY`,
        details:
          "Swim from Alcatraz: start controlled, sight early, stay calm in chop. Bike: fuel early, smooth power on hills and wind. Run: pace the sand and stairs—fuel at aid stations. Finish strong into Marina Green.",
        durationMin: 240,
      },
    ],
  ]),
];

function garminTailor(t: ActivityTemplate, weekIndex: number): ActivityTemplate {
  const z = thresholds.heartRateZones;
  const swimExtraMin = t.discipline === "swim" && weekIndex < 4 ? 12 : 0;
  const durationMin =
    t.durationMin != null ? t.durationMin + swimExtraMin : t.durationMin;
  const swimH = Math.round(trainingVolume12wEnding2026_04_17.bySportMinutes.swimming / 60);
  const bikeH = Math.round(trainingVolume12wEnding2026_04_17.bySportMinutes.cycling / 60);
  let details = t.details;
  if (t.discipline === "bike") {
    details = `Bike power (FTP ~${thresholds.functionalThresholdPower} W): Z2 endurance ~55–75% FTP; sweet spot ~84–97% FTP. HR Z2 ~${z.z2} bpm. ${details}`;
  } else if (t.discipline === "run") {
    details = `Run by HR — easy Z1–2 under ~152 bpm; steady Z2–3 ~152–168; threshold near LTHR ~${thresholds.lactateThresholdHeartRate} bpm. ${details}`;
  } else if (t.discipline === "swim") {
    details = `Swim is the relative gap vs your last 12 weeks (~${swimH} h swim vs ~${bikeH} h bike in Garmin export). ${details}`;
  } else if (t.discipline === "brick") {
    details = `Bike sub-threshold unless noted (~75–85% FTP); run off the bike by HR Z2 ~${z.z2} bpm. ${details}`;
  }
  return { ...t, details, durationMin };
}

function buildActivitiesForDate(dateIso: string, weekIndex: number): Activity[] {
  const day = mondayFirstWeekday(parseLocalDate(dateIso));
  const week = WEEKS[Math.min(weekIndex, WEEKS.length - 1)];
  const templates = week[day] ?? [];
  return templates.map((t, i) => {
    const tailored = garminTailor(t, weekIndex);
    return {
      ...tailored,
      id: `${dateIso}-${tailored.discipline}-${i}`,
      date: dateIso,
    };
  });
}

let planDaysCache: { date: string; weekIndex: number; activities: Activity[] }[] | null = null;

export function getPlanDays(): { date: string; weekIndex: number; activities: Activity[] }[] {
  if (planDaysCache) return planDaysCache;
  const dates = eachDateInclusive(PLAN_START, RACE_DATE);
  const start = parseLocalDate(PLAN_START);
  planDaysCache = dates.map((dateIso) => {
    const d = parseLocalDate(dateIso);
    const weekIndex = Math.floor((+d - +start) / (7 * 24 * 60 * 60 * 1000));
    return {
      date: dateIso,
      weekIndex,
      activities: buildActivitiesForDate(dateIso, weekIndex),
    };
  });
  return planDaysCache;
}

const activityById = new Map<string, Activity>();

export function getDefaultActivity(id: string): Activity | undefined {
  if (activityById.size === 0) {
    for (const day of getPlanDays()) {
      for (const a of day.activities) {
        activityById.set(a.id, a);
      }
    }
  }
  return activityById.get(id);
}
