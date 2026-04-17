"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getPlanDays, RACE_DATE, RACE_LABEL } from "@/lib/efa-default-plan";
import { tailoringSummary } from "@/lib/garmin-snapshot";
import { SiteNav } from "@/components/SiteNav";
import { visibleActivity } from "@/lib/efa-merge";
import { clearPlanState, loadPlanState, savePlanState } from "@/lib/efa-persist";
import type { Activity, Discipline, PlanState } from "@/lib/efa-types";
import { DisciplineStats, ProgressMap } from "@/components/ProgressMap";
import { ThemeToggle } from "@/components/ThemeToggle";

const FILTERS: (Discipline | "all")[] = ["all", "swim", "bike", "run", "brick"];

function fmtDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function fmtLong(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntilRace(): number {
  const race = new Date(`${RACE_DATE}T12:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  race.setHours(0, 0, 0, 0);
  return Math.ceil((+race - +today) / 86400000);
}

function pillClass(d: Discipline): string {
  return `pill pill-${d}`;
}

export function TrainingApp() {
  const [mounted, setMounted] = useState(false);
  const [planState, setPlanState] = useState<PlanState>({ completed: {}, patches: {} });
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", details: "", durationMin: "" });
  const dlgRef = useRef<HTMLDialogElement>(null);
  const planStateRef = useRef(planState);
  planStateRef.current = planState;

  useEffect(() => {
    setMounted(true);
    setPlanState(loadPlanState() ?? { completed: {}, patches: {} });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    savePlanState(planState);
  }, [mounted, planState]);

  useEffect(() => {
    if (!editingId) {
      dlgRef.current?.close();
      return;
    }
    dlgRef.current?.showModal();
    const act = visibleActivity(editingId, planStateRef.current);
    if (act) {
      setForm({
        title: act.title,
        details: act.details,
        durationMin: act.durationMin != null ? String(act.durationMin) : "",
      });
    }
  }, [editingId]);

  const planDays = useMemo(() => getPlanDays(), []);

  const totals = useMemo(() => {
    let done = 0;
    let total = 0;
    const stats: DisciplineStats = {
      swim: { done: 0, total: 0 },
      bike: { done: 0, total: 0 },
      run: { done: 0, total: 0 },
      brick: { done: 0, total: 0 },
    };
    for (const day of planDays) {
      for (const raw of day.activities) {
        const a = visibleActivity(raw.id, planState);
        if (!a) continue;
        total += 1;
        stats[a.discipline].total += 1;
        if (planState.completed[a.id]) {
          done += 1;
          stats[a.discipline].done += 1;
        }
      }
    }
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { done, total, pct, stats };
  }, [planDays, planState]);

  const weeksForMap = useMemo(() => {
    const grouped = new Map<number, typeof planDays>();
    for (const d of planDays) {
      if (!grouped.has(d.weekIndex)) grouped.set(d.weekIndex, []);
      grouped.get(d.weekIndex)!.push(d);
    }
    return [...grouped.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([weekIndex, days]) => ({
        weekIndex,
        days: [...days]
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((day) => {
            const acts = day.activities
              .map((x) => visibleActivity(x.id, planState))
              .filter(Boolean) as Activity[];
            const total = acts.length;
            const done = acts.filter((a) => planState.completed[a.id]).length;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            return {
              date: day.date,
              dayLabel: fmtDay(day.date),
              pct,
              done,
              total,
            };
          }),
      }));
  }, [planDays, planState]);

  const left = daysUntilRace();

  function toggleDone(id: string, next: boolean) {
    setPlanState((s) => ({
      ...s,
      completed: { ...s.completed, [id]: next },
    }));
  }

  function saveEdit() {
    if (!editingId) return;
    const raw = form.durationMin.trim();
    const n = raw === "" ? undefined : Number(raw);
    setPlanState((s) => {
      const patch = {
        title: form.title,
        details: form.details,
        ...(raw === "" ? {} : Number.isFinite(n) ? { durationMin: n as number } : {}),
      };
      return {
        ...s,
        patches: {
          ...s.patches,
          [editingId]: patch,
        },
      };
    });
    setEditingId(null);
  }

  function resetActivity() {
    if (!editingId) return;
    setPlanState((s) => {
      const next = { ...s.patches };
      delete next[editingId];
      return { ...s, patches: next };
    });
    setEditingId(null);
  }

  function resetAll() {
    if (!confirm("Clear all workout completions and custom edits? This cannot be undone.")) return;
    clearPlanState();
    setPlanState({ completed: {}, patches: {} });
  }

  if (!mounted) {
    return (
      <div className="page">
        <p className="notice">Loading your training plan…</p>
      </div>
    );
  }

  return (
    <div className="page">
      <SiteNav />
      <header className="hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h1>{RACE_LABEL}</h1>
          <ThemeToggle />
        </div>
        <p>
          Race day {fmtLong(RACE_DATE)}
          {left >= 0 ? ` · ${left} day${left === 1 ? "" : "s"} to go` : " · race week"}
        </p>
        <p style={{ marginTop: 12, opacity: 0.95, fontSize: "0.88rem", lineHeight: 1.45 }}>
          {tailoringSummary}
        </p>
        <div className="stats" aria-label="Overall completion">
          <div className="stat">
            <strong>{totals.pct}%</strong>
            <span>Overall complete</span>
          </div>
          <div className="stat">
            <strong>
              {totals.done}/{totals.total}
            </strong>
            <span>Workouts checked off</span>
          </div>
          <div className="stat">
            <strong>W1–W8</strong>
            <span>Build → peak → taper</span>
          </div>
        </div>
      </header>

      <ProgressMap weeks={weeksForMap} disciplineStats={totals.stats} />

      <div className="panel" style={{ marginTop: 16 }}>
        <h2>Your schedule</h2>
        <p className="notice">
          Plan runs Mon Apr 13 through Sun Jun 7 ({planDays.length} days). Check off sessions as you complete
          them; edit any row to match your coach, weather, or how you feel.
        </p>
        <div className="filters" role="group" aria-label="Filter workouts">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className="filter-btn"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="toolbar">
          <span className="notice">Progress saves automatically in this browser.</span>
          <button type="button" className="btn btn-ghost" onClick={resetAll}>
            Reset progress &amp; edits
          </button>
        </div>

        {planDays.map((day) => {
          const acts = day.activities
            .map((raw) => visibleActivity(raw.id, planState))
            .filter(Boolean) as Activity[];
          const visible = acts.filter((a) => filter === "all" || a.discipline === filter);
          if (visible.length === 0) return null;
          return (
            <section key={day.date} className="day-block" id={`day-${day.date}`}>
              <div className="day-head">
                <h3>{fmtLong(day.date)}</h3>
                <span>
                  Week {day.weekIndex + 1} · {fmtDay(day.date)}
                </span>
              </div>
              {visible.map((a) => (
                <article key={a.id} className="activity">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={!!planState.completed[a.id]}
                    onChange={(e) => toggleDone(a.id, e.target.checked)}
                    aria-label={`Mark complete: ${a.title}`}
                  />
                  <div className="activity-body">
                    <div className={pillClass(a.discipline)}>{a.discipline}</div>
                    <h4>{a.title}</h4>
                    {a.durationMin != null && (
                      <p className="muted" style={{ margin: "0 0 6px" }}>
                        Target ~{a.durationMin} min
                      </p>
                    )}
                    <p className="muted" style={{ margin: 0 }}>
                      {a.details}
                    </p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn" onClick={() => setEditingId(a.id)}>
                      Edit
                    </button>
                  </div>
                </article>
              ))}
            </section>
          );
        })}
      </div>

      <dialog
        ref={dlgRef}
        onClose={() => setEditingId(null)}
        aria-labelledby="edit-title"
      >
        <div className="dlg-inner">
          <h3 id="edit-title">Edit workout</h3>
          <p className="notice">Adjust the session to fit your day. Reset restores the default plan text.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
          >
            <fieldset>
              <label htmlFor="f-title">Title</label>
              <input
                id="f-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                autoComplete="off"
              />
              <label htmlFor="f-duration">Duration (minutes, optional)</label>
              <input
                id="f-duration"
                inputMode="numeric"
                value={form.durationMin}
                onChange={(e) => setForm((f) => ({ ...f, durationMin: e.target.value }))}
                autoComplete="off"
              />
              <label htmlFor="f-details">Details</label>
              <textarea
                id="f-details"
                value={form.details}
                onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              />
            </fieldset>
            <div className="dlg-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditingId(null)}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={resetActivity}>
                Reset to default
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
