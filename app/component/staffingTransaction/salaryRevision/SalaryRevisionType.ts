import { Dictionary } from "@/dictionaries/dictionaries";
import { z } from "zod";

type SalaryRevisionFormField =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["salaryRevision"];

export const getSalaryRevisionSchema = (
  salaryRevisionFormField: SalaryRevisionFormField,
) => {
  return z.object({
    explanation: z.string().optional(),
    currentCatsaJobLevel: z.string().optional(),
    newCatsaJobLevel: z
      .string()
      .trim()
      .min(1, salaryRevisionFormField.new_catsa_job_level.requiredMessage),
  });
};

export type SalaryRevisionType = z.infer<
  ReturnType<typeof getSalaryRevisionSchema>
>;
export type SalaryRevisionState = SalaryRevisionType;
export type SalaryRevisionCreate = SalaryRevisionType & {
  personId?: number;
  EffectiveDate: string;
  employmentDetailId: number;
};
export type SalaryRevisionCreateAPI = {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
  new_catsa_job_level: string;
  explanation?: string;
};

export const salaryRevisionTypeToCreateAPI = (
  salaryRevision: SalaryRevisionCreate,
): SalaryRevisionCreateAPI => {
  return {
    person_id: salaryRevision.personId!!,
    employment_detail_id: salaryRevision.employmentDetailId,
    effective_date: salaryRevision.EffectiveDate,
    new_catsa_job_level: salaryRevision.newCatsaJobLevel,
    explanation: salaryRevision.explanation,
  };
};

export const salaryRevisionInitValue: SalaryRevisionState = {
  newCatsaJobLevel: "",
  explanation: "",
};
