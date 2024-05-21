export const GenderValues = ["Select", "Male", "Female", "Other"] as const;
export type Gender = (typeof GenderValues)[number];

export const PronounValues = ["HE/HIM", "SHE/HER", "THEY/THEM"] as const;
export type Pronoun = (typeof PronounValues)[number];

export const SpeciesValues = ["Homo Sapien", "Canis"] as const;
export type Species = (typeof SpeciesValues)[number];

export const LanguageValues = ["FR", "EN"] as const;
export type Language = (typeof LanguageValues)[number];

export const RessourceValues = ["R1", "R2", "Employee (MVP)"] as const;
export type RessourceType = (typeof RessourceValues)[number];
