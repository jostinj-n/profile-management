import dayjs, { Dayjs } from "dayjs";
import z from "zod";

const personalDetail = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
});
// zod schema validation https://zod.dev/
export const firstPageSchema = z.object({
  employeeNumber: z.string().min(1, "Employee number is required"),
  ressourceType: z.string().min(1, "Ressource type is required"),
  effectiveDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  personalDetails: z.array(personalDetail),
  middleName: z.string(),
  preferredName: z.string(),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.instanceof(dayjs as unknown as typeof Dayjs),
  pronoun: z.string(),
  species: z.string(),
  primaryCommunicationLanguage: z
    .string()
    .min(1, "Primary Communication Language is required"),
  notes: z.string().max(1000, "1000 characters maximum"),
});

export type FirstPageType = z.infer<typeof firstPageSchema>;
