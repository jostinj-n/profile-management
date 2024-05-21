
export let PhoneTypeValues = ["cellular", "home"] as const;
export type PhoneType = (typeof PhoneTypeValues)[number];
