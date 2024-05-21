import dayjs, { Dayjs } from "dayjs";
import z from "zod";

//zod schema validation for the second page as-workforce-app\app\[lang]\workforce\create-profile\secondPage\secondPage.tsx line 31
export const seniority = z.object({
  seniorityId: z.number(),
  personId: z.number(),
  seniorityDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  seniorityDateTypeTiebreaker: z.number(),
  suppressSeniorityFlag: z.boolean(),
  notes: z.string(),
});
//zod schema validation https://zod.dev/
export const senioritySchema = z.object({
  seniority: z.array(seniority),
});
export type SenioritySchemaType = z.infer<typeof senioritySchema>;
