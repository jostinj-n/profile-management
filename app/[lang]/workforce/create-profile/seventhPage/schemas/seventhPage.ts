import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const language = z.object({
  name: z.string(),
});
const ID = z.object({
  otherEmployeeAssociatedIDType: z.string(),
  otherEmployeeAssociatedIDValue: z.string(),
  expiryDate: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you want to enforce Date objects
});
export const seventhPageSchema = z.object({
  IDs: z.array(ID),
  associatedIDs: z.string(), // Assuming there can be multiple associated IDs
  languages: z.array(language), // Assuming there can be multiple languages added
  CATSAJobLevel: z.string(),
  isBilingual: z.boolean(),
  activeUnionSteward: z.boolean(),
  isActiveHSCommitteeMember: z.boolean(),
  employmentNotes: z.string().optional(), // Optional if notes can be left blank
  notes: z.string(),
});
