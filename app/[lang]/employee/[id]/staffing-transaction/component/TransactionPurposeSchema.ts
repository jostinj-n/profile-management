import { Dictionary } from "@/dictionaries/dictionaries";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import { StaffingTransactionValues } from "@/app/[lang]/employee/[id]/staffing-transaction/component/TransactionPurposeType";

const isNonEmptyString = (value: string) => value.trim() !== "";

type TransactionPurposeFormField =
  Dictionary["workforce"]["staffingTransaction"]["transactionPurpose"]["field"];

export const getPurposeSchema = (
  transactionPurposeFormField: TransactionPurposeFormField,
) => {
  return z
    .object({
      purpose: z.enum(StaffingTransactionValues).refine(isNonEmptyString, {
        message: transactionPurposeFormField.purpose.RequireMessage,
      }),
      reason: z.string().optional(),
      effectiveDate: z.instanceof(dayjs as unknown as typeof Dayjs),
      employmentDetailId: z
        .number()
        .min(1, transactionPurposeFormField.employmentRecord.RequireMessage),
    })
    .refine(
      (schema) => {
        if (schema.purpose === "Other") {
          return (
            typeof schema.reason === "string" && schema.reason.trim().length > 0
          );
        }

        return true;
      },
      {
        message: transactionPurposeFormField?.reason.RequireMessage,
        path: ["reason"],
      },
    );
};

const TransactionPurposeZod = getPurposeSchema({
  effectiveDate: {
    label: "",
    RequireMessage: "",
  },
  employmentRecord: {
    label: "",
    RequireMessage: "",
  },
  purpose: {
    label: "",
    RequireMessage: "",
  },
  reason: {
    label: "",
    RequireMessage: "",
  },
});

export type TransactionPurposeSchema = z.infer<typeof TransactionPurposeZod>;
