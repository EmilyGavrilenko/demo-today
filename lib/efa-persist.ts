import type { PlanState } from "./efa-types";

const KEY = "efa-escape-plan-v1";

export function loadPlanState(): PlanState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlanState;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      completed: { ...(parsed.completed ?? {}) },
      patches: { ...(parsed.patches ?? {}) },
    };
  } catch {
    return null;
  }
}

export function savePlanState(state: PlanState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode
  }
}

export function clearPlanState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
