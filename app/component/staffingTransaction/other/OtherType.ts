import { Dictionary } from "@/dictionaries/dictionaries";
import { z } from "zod";

type OtherFormFieldLabel =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["other"];

export const getOtherSchema = (otherFormFieldLabel?: OtherFormFieldLabel) => {
  return z.object({
    roe_code: z.string(),
    code_description: z.string(),
    explanation: z
      .string()
      .trim()
      .min(1, otherFormFieldLabel?.explanation?.requiredMessage),
  });
};

export type OtherType = z.infer<ReturnType<typeof getOtherSchema>>;
export type OtherState = OtherType;
export type OtherCreate = OtherState & {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
  reason?: string;
};

export const otherInitialValue = {
  roe_code: "",
  code_description: "",
  explanation: "",
};
