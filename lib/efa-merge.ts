import type { Activity, ActivityPatch, PlanState } from "./efa-types";
import { getDefaultActivity } from "./efa-default-plan";

export function mergeActivity(base: Activity, patch?: ActivityPatch): Activity {
  if (!patch) return base;
  return {
    ...base,
    ...(patch.title !== undefined ? { title: patch.title } : {}),
    ...(patch.details !== undefined ? { details: patch.details } : {}),
    ...(patch.durationMin !== undefined ? { durationMin: patch.durationMin } : {}),
  };
}

export function visibleActivity(id: string, state: PlanState): Activity | undefined {
  const base = getDefaultActivity(id);
  if (!base) return undefined;
  return mergeActivity(base, state.patches[id]);
}
