import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const eighthPageSchema = z.object({
  vacationEntitlementDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  workLocationStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  statusClassificationStartDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  workLocationTiebreakerValue: z.number(),
  statusClassificationTiebreakerValue: z.number(),
  note: z.string(),
});
