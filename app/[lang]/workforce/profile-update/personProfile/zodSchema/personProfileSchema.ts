import dayjs, { Dayjs } from "dayjs";
import z from "zod";

const personalDetail = z.object({
  legalFirstName: z.string().min(1, "Name is required"),
  legalLastName: z.string().min(1, "Last Name is required"),
});
// zod schema validation https://zod.dev/
export const personProfileSchema = z.object({
  resourceType: z.string().min(1, "Ressource Type required"), //
  personalPronoun: z.string().optional(), //
  personalDetails: z.array(personalDetail), //
  middleName: z.string().optional(), //
  preferredName: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  primaryCommunicationLanguage: z
    .string()
    .min(1, "Primary Communication Language is required"),
  species: z.string(),
  notes: z.string().max(1000, "1000 characters maximum"),
  dateOfBirth: z.instanceof(dayjs as unknown as typeof Dayjs),
});

export type PersonProfileType = z.infer<typeof personProfileSchema>;
