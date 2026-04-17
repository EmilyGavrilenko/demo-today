import {
  fitnessAgeLatest,
  GARMIN_DATA_AS_OF,
  formatRace,
  healthStatusLatest,
  racePredictionsLatest,
  thresholds,
  trainingReadinessLatest,
  trainingVolume12wEnding2026_04_17,
  trainingVolume28dEnding2026_04_17,
} from "@/lib/garmin-snapshot";

export function HealthDashboard() {
  const v = trainingVolume12wEnding2026_04_17.bySportMinutes;
  const v28 = trainingVolume28dEnding2026_04_17;

  return (
    <div className="page">
      <header className="hero">
        <h1>Health &amp; training metrics</h1>
        <p>
          Snapshot from Garmin export · last detailed sync {GARMIN_DATA_AS_OF}. Scores are informational, not
          medical advice.
        </p>
      </header>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Training readiness</h2>
        <p className="notice">
          Overall score <strong>{trainingReadinessLatest.score}</strong> — {trainingReadinessLatest.level}{" "}
          ({trainingReadinessLatest.feedbackShort.replace(/_/g, " ").toLowerCase()}).
        </p>
        <div className="metric-grid">
          {trainingReadinessLatest.factors.map((f) => (
            <div key={f.name} className="metric-card">
              <div className="metric-name">{f.name}</div>
              <div className="metric-value">
                {f.percent > 0 ? `${f.percent}%` : "—"}
                <span className="muted"> {f.label.replace(/_/g, " ")}</span>
              </div>
              <div className="meter" role="img" aria-label={`${f.name} ${f.percent}%`}>
                <span style={{ width: `${Math.min(100, f.percent)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginBottom: 0 }}>
          Acute load {trainingReadinessLatest.acuteLoad} · HRV weekly avg {trainingReadinessLatest.hrvWeeklyAverage}
        </p>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Training volume (Garmin history)</h2>
        <p className="notice">{trainingVolume12wEnding2026_04_17.windowLabel}</p>
        <ul className="vol-list">
          <li>
            <span className="pill pill-bike">Bike</span> ~{Math.round(v.cycling / 60)} h ({v.cycling} min)
          </li>
          <li>
            <span className="pill pill-run">Run</span> ~{Math.round(v.running / 60)} h ({v.running} min)
          </li>
          <li>
            <span className="pill pill-swim">Swim</span> ~{Math.round(v.swimming / 60)} h ({v.swimming} min)
          </li>
          <li>
            <span className="pill pill-brick">Other</span> strength / misc ~{v.training} min
          </li>
        </ul>
        <p className="notice">{v28.windowLabel}</p>
        <p className="muted">
          {v28.sessionCount} sessions, ~{Math.round(v28.totalMinutes)} min total
          {v28.bySportMinutes.swimming ? ` · swim ${v28.bySportMinutes.swimming} min` : ""}
          {v28.bySportMinutes.running ? ` · run ${v28.bySportMinutes.running} min` : ""}. {v28.note}
        </p>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Fitness age &amp; cardio</h2>
        <div className="stat-row">
          <div>
            <strong>{fitnessAgeLatest.vo2Max.toFixed(1)}</strong>
            <span className="muted"> VO₂ max (mL/kg/min)</span>
          </div>
          <div>
            <strong>{fitnessAgeLatest.fitnessAge.toFixed(1)}</strong>
            <span className="muted"> fitness age (vs {fitnessAgeLatest.chronologicalAge} y chronological)</span>
          </div>
          <div>
            <strong>{fitnessAgeLatest.restingHeartRate}</strong>
            <span className="muted"> resting HR (Dec 2025–Mar 2026 trend in export)</span>
          </div>
        </div>
        <p className="muted" style={{ marginBottom: 0 }}>
          As of {fitnessAgeLatest.asOfDate}.
        </p>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Heart rate &amp; power thresholds</h2>
        <table className="data-table">
          <tbody>
            <tr>
              <th scope="row">LTHR (run)</th>
              <td>{thresholds.lactateThresholdHeartRate} bpm</td>
            </tr>
            <tr>
              <th scope="row">FTP</th>
              <td>{thresholds.functionalThresholdPower} W</td>
            </tr>
            <tr>
              <th scope="row">Max HR</th>
              <td>{thresholds.maxHeartRate} bpm</td>
            </tr>
            <tr>
              <th scope="row">Resting HR (zones)</th>
              <td>{thresholds.restingHeartRate} bpm</td>
            </tr>
            <tr>
              <th scope="row">Z1</th>
              <td>{thresholds.heartRateZones.z1} bpm</td>
            </tr>
            <tr>
              <th scope="row">Z2</th>
              <td>{thresholds.heartRateZones.z2} bpm</td>
            </tr>
            <tr>
              <th scope="row">Z3</th>
              <td>{thresholds.heartRateZones.z3} bpm</td>
            </tr>
            <tr>
              <th scope="row">Z4</th>
              <td>{thresholds.heartRateZones.z4} bpm</td>
            </tr>
            <tr>
              <th scope="row">Z5</th>
              <td>{thresholds.heartRateZones.z5} bpm</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Health status scores ({healthStatusLatest.date})</h2>
        <p className="notice">Overnight / resting metrics vs your baseline (Garmin Health Status).</p>
        <div className="metric-grid">
          {healthStatusLatest.metrics.map((m) => (
            <div key={m.type} className="metric-card">
              <div className="metric-name">{m.type}</div>
              <div className="metric-value">
                {m.value}
                <span className="muted"> {m.status.replace(/_/g, " ")}</span>
              </div>
              <div className="meter" role="img" aria-label={`${m.type} ${m.percent}%`}>
                <span style={{ width: `${m.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Race predictions (run)</h2>
        <p className="muted">Garmin estimator as of {racePredictionsLatest.date}.</p>
        <table className="data-table">
          <tbody>
            <tr>
              <th scope="row">5K</th>
              <td>{formatRace(racePredictionsLatest.raceTime5KSec)}</td>
            </tr>
            <tr>
              <th scope="row">10K</th>
              <td>{formatRace(racePredictionsLatest.raceTime10KSec)}</td>
            </tr>
            <tr>
              <th scope="row">Half marathon</th>
              <td>{formatRace(racePredictionsLatest.raceTimeHalfSec)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
