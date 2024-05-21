/*Third Page containing the type and values of the Primary Contact section of the from*/

export const RelationshipValues = ["Father",  "Mother", "Wife","Other"] as const
export type Relationship = (typeof RelationshipValues)[number]

export const PersonalPronounValues = ["He/Him", "She/Her","They/Them"] as const
export type PersonalPronoun = (typeof PersonalPronounValues)[number]

export const NumberDeviceTypeValues = ["Mobile", "Land","Fax"] as const
export type NumberDeviceType = (typeof NumberDeviceTypeValues)[number]


export const LanguageOfCommunicationValues = ["Fr", "En"] as const
export type LanguageOfCommunication = (typeof LanguageOfCommunicationValues)[number]

