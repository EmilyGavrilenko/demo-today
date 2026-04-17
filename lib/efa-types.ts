export type Discipline = "swim" | "bike" | "run" | "brick";

export type ActivityTemplate = {
  discipline: Discipline;
  title: string;
  details: string;
  durationMin?: number;
};

export type Activity = ActivityTemplate & {
  id: string;
  date: string;
};

export type ActivityPatch = Partial<Pick<Activity, "title" | "details" | "durationMin">>;

export type PlanState = {
  completed: Record<string, boolean>;
  patches: Record<string, ActivityPatch>;
};
