/*Page containing teh zod schema to validate data from the fields of the form */
import dayjs, {Dayjs} from "dayjs";
import z from "zod";

const governmentID = z.object({
  typeOfId: z.string(),
  issuedByAgency: z.string(),
  issuedValue: z.string().min(2, "min 2 characters"),
  expiryDate: z.instanceof(dayjs as unknown as typeof Dayjs),
});

//zod schema validation for the second page as-workforce-app\app\[lang]\workforce\create-profile\secondPage\secondPage.tsx line 31
export const secondPageSchema = z.object({
  citizenCountry: z.string().min(1, "Citizen Country is required"),
  citizenIssuingAgency: z.string().min(2, "2 character min"),
  status: z.string().min(1, "Status is required"),
  statusIdType: z.string().min(1, "Status ID Type is required is required"),
  idValue: z.string().min(2, "ID Value is required 2 character minimum"),
  effectiveFrom: z.instanceof(dayjs as unknown as typeof Dayjs),
  effectiveTo: z.instanceof(dayjs as unknown as typeof Dayjs),
  governmentIDs: z.array(governmentID),
  binaryGender: z.string().min(1, "Binary Gender is required"),
  taxIdType: z.string().min(2, "Tax ID Type is required"),
  taxIdValue: z.string().min(2, "Tax ID Value required minimum 2 characters"),
  taxIssuingAgency: z.string(),
  expiryDateTax: z.instanceof(dayjs as unknown as typeof Dayjs),
  notes: z.string(),
});
