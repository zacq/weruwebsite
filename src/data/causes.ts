export const CAUSES = [
  "Disability Is Not Inability",
  "Keep a Girl in School",
  "Orphaned & Vulnerable Children",
  "Prisons",
  "Elderly",
] as const;

export type Cause = (typeof CAUSES)[number];
