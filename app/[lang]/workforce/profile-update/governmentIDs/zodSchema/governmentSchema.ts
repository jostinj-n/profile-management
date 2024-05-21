import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const governmentIssuedID = z.object({
  personId: z.number(),
  typeOfId: z.string().min(1, "Type of ID is required"),
  issuedByAgency: z.string().min(1, "Issuing agency is required"),
  issuedValue: z.string().min(2, "Issued value is required"),
  expiryDate: z.instanceof(dayjs as unknown as typeof Dayjs),
});

export const citizenStatusID = z.object({
  personId: z.number(),
  citizenStatusIdType: z
    .string()
    .min(1, "Status ID Type is required is required"),
  issuingAgency: z.string(),
  citizenStatusIdNumber: z
    .string()
    .min(2, "ID Value is required 2 character minimum"),
  citizenStatusEffectiveFrom: z.instanceof(dayjs as unknown as typeof Dayjs),
  citizenStatusEffectiveTo: z.instanceof(dayjs as unknown as typeof Dayjs),
});

export const taxID = z.object({
  personId: z.number(),
  taxIdType: z.string().min(2, "Tax ID Type is required"),
  taxIdValue: z.string().min(2, "Tax ID Value required minimum 2 characters"),
  taxIdExpiryDateTax: z.instanceof(dayjs as unknown as typeof Dayjs),
  issuingAgency: z.string(),
});
//zod schema validation for the second page as-workforce-app\app\[lang]\workforce\create-profile\secondPage\secondPage.tsx line 31
export const governmentSchema = z.object({
  personId: z.number(),
  citizenStatusIDs: z.array(citizenStatusID),
  personalDetailsNotes: z.string().optional(),
  governmentIDs: z.array(governmentIssuedID),
  taxIDs: z.array(taxID),
  binaryGender: z.string().min(1, "Binary Gender is required"),
  citizenStatusCountry: z.string().min(1, "Citizen Country is required"),
  citizenStatus: z.string().min(1, "Status is required"),
});
export type GovernmentSectionType = z.infer<typeof governmentSchema>;
