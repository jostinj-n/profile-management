import { Dictionary } from "@/dictionaries/dictionaries";
import dayjs, { Dayjs } from "dayjs";
import { FieldValues, Path } from "react-hook-form";
import { z } from "zod";

type MainFormField =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["mainPromotionDemotionTransfer"];

export const getSchema = (mainFormField?: MainFormField) => {
  return z.object({
    newCompany: z
      .string()
      .trim()
      .min(1, mainFormField?.newCompany.requiredMessage),
    newDivision: z
      .string()
      .trim()
      .min(1, mainFormField?.newDivision.requiredMessage),
    newWorkLocationCode: z
      .string()
      .trim()
      .min(1, mainFormField?.newWorkLocationCode.requiredMessage),
    newWorkLocationName: z
      .string()
      .trim()
      .min(1, mainFormField?.newWorkLocationName.requiredMessage),
    newDepartment: z
      .string()
      .trim()
      .min(1, mainFormField?.newDepartment.requiredMessage),
    newOrganizationalRole: z
      .string()
      .trim()
      .min(1, mainFormField?.newOrganizationalRole.requiredMessage),

    newOrganizationalRoleSubtype: z.string(),
    newJobTitle: z.string(),
    newCatsaJobLevel: z
      .string()
      .trim()
      .min(1, mainFormField?.newCatsaJobLevel.requiredMessage),

    newEmploymentClassification: z
      .string()
      .trim()
      .min(1, mainFormField?.newEmploymentClassification.requiredMessage),
    employmentStatus: z
      .string()
      .trim()
      .min(1, mainFormField?.employmentStatus.requiredMessage),
    explanation: z.string().optional(),

    lastDayWorkedInRole: z.instanceof(dayjs as unknown as typeof Dayjs),
    firstDayWorkedInRole: z.instanceof(dayjs as unknown as typeof Dayjs),
    isNewPositionUnionized: z
      .string()
      .trim()
      .min(1, mainFormField?.isNewPositionUnionized.requiredMessage),
    transferType: z.string().optional(),
  });
};

export type MainType = z.infer<ReturnType<typeof getSchema>>;
export type MainState = Omit<
  MainType,
  "lastDayWorkedInRole" | "firstDayWorkedInRole"
> & {
  firstDayWorkedInRole: string;
  lastDayWorkedInRole: string;
};
export type MainCreate = MainState & {
  personId?: number;
  effectiveDate: string;
  employmentDetailId: number;
};

export type MainCreateAPI = {
  person_id?: number;
  employment_detail_id: number;
  effective_date: string;
  new_company: string;
  new_division: string;
  new_work_location_code: string;
  new_work_location_name: string;
  new_department: string;
  new_organizational_role: string;
  new_organizational_role_subtype: string;
  new_job_title: string;
  new_catsa_job_level: string;
  new_employment_classification: string;
  explanation?: string;
  first_day_worked_in_role: string;
  last_day_worked_in_role: string;
  is_new_position_unionized: boolean;
};

export const typeToAPI = (mainCreate: MainCreate): MainCreateAPI => ({
  person_id: mainCreate.personId,
  employment_detail_id: mainCreate.employmentDetailId,
  effective_date: mainCreate.effectiveDate,
  new_company: mainCreate.newCompany,
  new_division: mainCreate.newDivision,
  new_work_location_code: mainCreate.newWorkLocationCode,
  new_work_location_name: mainCreate.newWorkLocationName,
  new_department: mainCreate.newDepartment,
  new_organizational_role: mainCreate.newOrganizationalRole,
  new_organizational_role_subtype: mainCreate.newOrganizationalRoleSubtype,
  new_job_title: mainCreate.newJobTitle,
  new_catsa_job_level: mainCreate.newCatsaJobLevel,
  new_employment_classification: mainCreate.newEmploymentClassification,
  explanation: mainCreate.explanation,
  last_day_worked_in_role: mainCreate.lastDayWorkedInRole,
  first_day_worked_in_role: mainCreate.firstDayWorkedInRole,
  is_new_position_unionized: mainCreate.isNewPositionUnionized === "Yes",
});

export const mainInitValue: MainState = {
  newCompany: "Canada - GardaWorld Security Screening Inc",
  newDivision: "Aviation",
  newWorkLocationCode: "",
  newWorkLocationName: "",
  newDepartment: "",
  newOrganizationalRole: "",

  newOrganizationalRoleSubtype: "",
  newJobTitle: "",
  newCatsaJobLevel: "",

  newEmploymentClassification: "",
  employmentStatus: "",
  explanation: "",
  lastDayWorkedInRole: dayjs().format(),
  firstDayWorkedInRole: dayjs().format(),
  isNewPositionUnionized: "No",
};

export type Fields<T extends FieldValues> = {
  firstDayWorkedInRole: Path<T>;
  lastDayWorkedInRole: Path<T>;
  newCompany: Path<T>;
  newDivision: Path<T>;
  newDepartment: Path<T>;
  newWorkLocationCode: Path<T>;
  newWorkLocationName: Path<T>;
  newOrganizationalRole: Path<T>;
  newOrganizationalRoleSubtype: Path<T>;
  newJobTitle: Path<T>;
  newCatsaJobLevel: Path<T>;
  newEmploymentClassification: Path<T>;
  employmentStatus: Path<T>;
  isNewPositionUnionized: Path<T>;
  explanation: Path<T>;
};
export const fields: Fields<MainType> = {
  firstDayWorkedInRole: "firstDayWorkedInRole",
  lastDayWorkedInRole: "lastDayWorkedInRole",
  newCompany: "newCompany",
  newDivision: "newDivision",
  newDepartment: "newDepartment",
  newWorkLocationCode: "newWorkLocationCode",
  newWorkLocationName: "newWorkLocationName",
  newOrganizationalRole: "newOrganizationalRole",
  newOrganizationalRoleSubtype: "newOrganizationalRoleSubtype",
  newJobTitle: "newJobTitle",
  newCatsaJobLevel: "newCatsaJobLevel",
  newEmploymentClassification: "newEmploymentClassification",
  employmentStatus: "employmentStatus",
  isNewPositionUnionized: "isNewPositionUnionized",
  explanation: "explanation",
};
