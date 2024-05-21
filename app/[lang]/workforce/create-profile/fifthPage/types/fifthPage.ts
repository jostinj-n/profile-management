
export const RelationshipValues = ["Mother", "Father","Brother"] as const
export type RelationshipType = (typeof RelationshipValues)[number]
