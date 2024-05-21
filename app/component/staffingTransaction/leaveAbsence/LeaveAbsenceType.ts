import { Dictionary } from "@/dictionaries/dictionaries";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

type LeaveAbsenceFormField =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["leaveAbsence"];

export const getLeaveAbsenceSchema = (
  leaveAbsenceFormField?: LeaveAbsenceFormField
) => {
  return z
    .object({
      loa_type: z
        .string()
        .trim()
        .min(1, leaveAbsenceFormField?.loa_type.requiredMessage),
      date_from: z.instanceof(dayjs as unknown as typeof Dayjs),
      date_to: z.instanceof(dayjs as unknown as typeof Dayjs),
      date_expected_return_to_work: z.instanceof(
        dayjs as unknown as typeof Dayjs
      ),
      notes: z.string(),
      roe_code: z
        .string()
        .trim()
        .min(1, leaveAbsenceFormField?.roe_code.requiredMessage),
      code_description: z.string().optional(),
      explanation: z.string().optional(),
      employment_status: z
        .number()
        .min(1, leaveAbsenceFormField?.employment_status.requiredMessage),
    })
    .refine(
      (schema) => {
        return (
          schema.date_from.isBefore(schema.date_to) ||
          schema.date_from.isSame(schema.date_to)
        );
      },
      {
        message: leaveAbsenceFormField?.date_to.ruleMessage,
        path: ["date_to"],
      }
    )
    .refine(
      (schema) => {
        return schema.date_from.isBefore(schema.date_expected_return_to_work);
      },
      {
        message:
          leaveAbsenceFormField?.date_expected_return_to_work.ruleMessage,
        path: ["date_expected_return_to_work"],
      }
    )
    .refine(
      (schema) => {
        return (
          schema.date_expected_return_to_work.diff(schema.date_to, "days") > 6
        );
      },
      {
        message:
          leaveAbsenceFormField?.date_expected_return_to_work
            .ruleMessageWithDateTo,
        path: ["date_expected_return_to_work"],
      }
    );
};

export const LeaveAbsenceZod = getLeaveAbsenceSchema();
export type LeaveAbsenceType = z.infer<typeof LeaveAbsenceZod>;
export type LeaveAbsenceState = Omit<
  LeaveAbsenceType,
  "date_expected_return_to_work" | "date_from" | "date_to"
> & {
  date_from: string;
  date_to: string;
  date_expected_return_to_work: string;
};

export type LeaveAbsenceCreate = LeaveAbsenceState & {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
};

export const leaveAbsenceInitialValue = {
  loa_type: "",
  date_from: dayjs().format(), //"2023-12-22",
  date_to: dayjs().format(),
  date_expected_return_to_work: dayjs().add(7, "day").format(),
  notes: "",
  roe_code: "",
  explanation: "",
  code_description: "",
  employment_status: 2,
};
