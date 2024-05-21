import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const returnToWorkSchema = z.object({
  example: z.string(),
  exampleDate: z.instanceof(dayjs as unknown as typeof Dayjs),
});

export type ReturnToWorkType = z.infer<typeof returnToWorkSchema>;
export type ReturnToWorkState = Omit<ReturnToWorkType, "exampleDate"> & {
  exampleDate: string;
};

export const returnToWorkInitValue: ReturnToWorkState = {
  example: "",
  exampleDate: "",
};
