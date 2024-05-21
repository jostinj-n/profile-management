import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { Dictionary } from "@/dictionaries/dictionaries";

type ClassificationChangeFormFieldLabel =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["classificationChange"];

export const classificationChangeSchema = (
  errorsLabel: ClassificationChangeFormFieldLabel,
) =>
  z.object({
    department: z
      .string()
      .trim()
      .min(1, errorsLabel.department.requiredMessage),
    vacationEntitlementDate: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine(
        (date) =>
          date.startOf("day").isAfter(dayjs().add(-1, "day").endOf("day")),
        errorsLabel.vacationEntitlementDate.cannotBeInThePast,
      ),
    jobLevel: z.string().trim().min(1, errorsLabel.jobLevel.requiredMessage),
    employmentStatus: z
      .string()
      .trim()
      .min(1, errorsLabel.employmentStatus.requiredMessage),
    statusClassification: z
      .string()
      .trim()
      .min(1, errorsLabel.statusClassification.requiredMessage),
    explanation: z.string().optional(),
  });

export type ClassificationChangeType = {
  department: string;
  vacationEntitlementDate: Dayjs;
  jobLevel: string;
  employmentStatus: string;
  statusClassification: string;
  explanation: string;
};

export type ClassificationChangeFrontPayload = {
  personId?: number;
  employmentDetailId: number;
  effectiveDate: string;
  newDepartment: string;
  newVacationEntitlementDate: string;
  newCatsaJobLevel: string;
  newEmploymentClassification: string;
  newEmploymentStatus: string;
  explanation: string;
};

export type ClassificationChangeState = Omit<
  ClassificationChangeType,
  "vacationEntitlementDate"
> & {
  vacationEntitlementDate: string;
};

export const classificationInitValue = {
  department: " ",
  vacationEntitlementDate: "",
  jobLevel: " ",
  employmentStatus: " ",
  statusClassification: " ",
  explanation: "",
};
