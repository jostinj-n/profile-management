import { Dictionary } from "@/dictionaries/dictionaries";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

type TerminationFormFieldLabel =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["termination"];

export const getTerminationSchema = (
  terminationFormFieldLabel?: TerminationFormFieldLabel,
) => {
  return z
    .object({
      last_day_work_in_role: z.instanceof(dayjs as unknown as typeof Dayjs),
      reason: z
        .string()
        .trim()
        .min(1, terminationFormFieldLabel?.reason.requiredMessage),
      other_reason_notes: z.string(),
      rehire_flag: z.string(),
      notes_for_rehire_selection: z.string(),
      additional_notes: z.string(),
      roe_code: z
        .string()
        .trim()
        .min(1, terminationFormFieldLabel?.roe_code.requiredMessage),
      code_description: z.string(),
      explanation: z.string(),
      employment_status: z
        .number()
        .min(1, terminationFormFieldLabel?.employment_status.requiredMessage),
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
        message: terminationFormFieldLabel?.other_reason_notes.requiredMessage,
        path: ["other_reason_notes"],
      },
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
          terminationFormFieldLabel?.notes_for_rehire_selection.requiredMessage,
        path: ["notes_for_rehire_selection"],
      },
    );
};

export const TerminationZod = getTerminationSchema();
export type TerminationType = z.infer<typeof TerminationZod>;
export type TerminationState = Omit<
  TerminationType,
  "last_day_work_in_role" | "rehire_flag"
> & {
  last_day_work_in_role: string;
  rehire_flag: boolean;
};
export type TerminationCreate = TerminationState & {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
};

export const TerminationInitialValue = {
  last_day_work_in_role: dayjs().format(),
  reason: "",
  other_reason_notes: "",
  rehire_flag: false,
  notes_for_rehire_selection: "",
  additional_notes: "",
  roe_code: "M00",
  code_description: "",
  explanation: "",
  employment_status: 9,
};
