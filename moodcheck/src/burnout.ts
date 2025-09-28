// burnout.ts
export const QUESTIONS = [
  "Did you feel emotionally drained or exhausted from work?",
  "Did stress from work make it hard to relax after hours?",
  "Did you feel detached, cynical, or negative about your tasks?",
  "Did you have trouble concentrating or staying focused at work?",
  "Did you feel overwhelmed by workload or deadlines?",
  "Did you lose interest or pleasure in your usual work activities?",
  "Did you feel anxious or worried when thinking about work?",
  "Did you feel unsupported or isolated in your team or role?",
  "Did work concerns affect your sleep or rest?",
  "Did you feel that taking time off (a PTO/mental health day) would help?"
] as const;

export type Answer = 0 | 1 | 2 | 3;

export const ANSWER_OPTIONS: { value: Answer; label: string }[] = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days (1–2 days this past week)" },
  { value: 2, label: "More than half the days (3–4 days this past week)" },
  { value: 3, label: "Nearly every day (5–7 days this past week)" },
];

export function computeScore(answers: number[]): number {
  return answers.reduce((s, v) => s + (Number(v) || 0), 0);
}

export function resultMessage(score: number): string {
  if (score <= 10) return "Overall stress appears manageable. Keep simple habits that help you recharge.";
  if (score <= 20) return "Moderate stress detected. Consider small changes and a quick check-in with your manager or support system.";
  return "High stress reported. Prioritize rest and support; consider taking time off and speaking with a professional if needed.";
}