"use client";

import { Fragment } from "react";

type MapDay = {
  date: string;
  dayLabel: string;
  pct: number;
  done: number;
  total: number;
};

type MapWeek = {
  weekIndex: number;
  days: MapDay[];
};

type DisciplineKey = "swim" | "bike" | "run" | "brick";

export type DisciplineStats = Record<DisciplineKey, { done: number; total: number }>;

export function ProgressMap({
  weeks,
  disciplineStats,
}: {
  weeks: MapWeek[];
  disciplineStats: DisciplineStats;
}) {
  const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="panel">
      <h2>Progress map</h2>
      <p className="notice">
        Eight weeks from plan start through race day. Each cell shows completion for that day; bars below sum
        swim, bike, run, and brick workouts.
      </p>
      <div className="map-wrap">
        <div className="map-grid" role="img" aria-label="Training progress by week and day">
          <div className="map-corner" />
          {dow.map((d) => (
            <div key={d} className="map-label">
              {d}
            </div>
          ))}
          {weeks.map((w) => (
            <Fragment key={w.weekIndex}>
              <div className="map-week">W{w.weekIndex + 1}</div>
              {w.days.map((day) => (
                <div key={day.date} className="map-cell" title={`${day.dayLabel}: ${day.done}/${day.total} done`}>
                  <div className="map-cell-date">{day.dayLabel}</div>
                  <div className="map-cell-bar" aria-hidden>
                    <div className="map-cell-fill" style={{ width: `${day.pct}%` }} />
                  </div>
                  <div className="map-cell-meta">
                    {day.total === 0 ? "—" : `${day.done}/${day.total}`}
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="map-legend" aria-hidden>
        <span>
          <i style={{ background: "var(--done)" }} /> Complete
        </span>
        <span>
          <i style={{ background: "var(--pending)" }} /> Remaining
        </span>
      </div>
      <DisciplineBars stats={disciplineStats} />
    </div>
  );
}

function DisciplineBars({ stats }: { stats: DisciplineStats }) {
  const items: { key: DisciplineKey; label: string; color: string }[] = [
    { key: "swim", label: "Swim", color: "var(--swim)" },
    { key: "bike", label: "Bike", color: "var(--bike)" },
    { key: "run", label: "Run", color: "var(--run)" },
    { key: "brick", label: "Brick", color: "var(--brick)" },
  ];
  return (
    <div style={{ marginTop: 6 }}>
      {items.map((item) => {
        const s = stats[item.key];
        const pct = s.total === 0 ? 0 : Math.round((s.done / s.total) * 100);
        return (
          <div key={item.key} className="seg">
            <div className="seg-label">{item.label}</div>
            <div className="seg-track" title={`${s.done} of ${s.total}`}>
              <div className="seg-fill" style={{ width: `${pct}%`, background: item.color }} />
            </div>
            <div style={{ width: 48, textAlign: "right", fontSize: "0.8rem", color: "var(--muted)" }}>
              {s.done}/{s.total}
            </div>
          </div>
        );
      })}
    </div>
  );
}
