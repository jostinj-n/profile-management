import { Dictionary } from "@/dictionaries/dictionaries";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

type ResignationFormFieldLabel =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["resignation"];

export const getResignationSchema = (
  resignationFormFieldLabel?: ResignationFormFieldLabel
) => {
  return z
    .object({
      last_day_work_in_role: z.instanceof(dayjs as unknown as typeof Dayjs),
      reason: z
        .string()
        .trim()
        .min(1, resignationFormFieldLabel?.reason.requiredMessage),
      other_reason_notes: z.string(),
      rehire_flag: z.string(),
      notes_for_rehire_selection: z.string(),
      additional_notes: z.string(),
      roe_code: z
        .string()
        .trim()
        .min(1, resignationFormFieldLabel?.roe_code.requiredMessage),
      code_description: z.string(),
      explanation: z.string(),
      employment_status: z
        .number()
        .min(1, resignationFormFieldLabel?.employment_status.requiredMessage),
    })
    .refine(
      (schema) => {
        if (schema.reason === "Other") {
          return (
            typeof schema.other_reason_notes === "string" &&
            schema.other_reason_notes.trim().length > 0
          );
        }

        return true;
      },
      {
        message: resignationFormFieldLabel?.other_reason_notes.requiredMessage,
        path: ["other_reason_notes"],
      }
    )
    .refine(
      (schema) => {
        if (schema.rehire_flag === "Yes") {
          return (
            typeof schema.notes_for_rehire_selection === "string" &&
            schema.notes_for_rehire_selection.trim().length > 0
          );
        }

        return true;
      },
      {
        message:
          resignationFormFieldLabel?.notes_for_rehire_selection.requiredMessage,
        path: ["notes_for_rehire_selection"],
      }
    );
};

export const ResignationZod = getResignationSchema();
export type ResignationType = z.infer<typeof ResignationZod>;
export type ResignationState = Omit<
  ResignationType,
  "last_day_work_in_role" | "rehire_flag"
> & {
  last_day_work_in_role: string;
  rehire_flag: boolean;
};
export type ResignationCreate = ResignationState & {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
};

export const resignationInitialValue = {
  last_day_work_in_role: dayjs().format(),
  reason: "",
  other_reason_notes: "",
  rehire_flag: false,
  notes_for_rehire_selection: "",
  additional_notes: "",
  roe_code: "E00",
  code_description: "",
  explanation: "",
  employment_status: 9,
};
