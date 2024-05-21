import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const ninthPageSchema = z.object({
  issuedPassType: z.string(),
  reimbursementType: z.string(),
  reimbursementAmount: z.number().min(0, "Minimum 0"),
  reimbursementPercentage: z
    .number()
    .min(0, "Minimum 0")
    .max(100, "Maximum 100"),
  reimbursementDollar: z.string(),
  issuingAgency: z.string(),
  monthlyRateWithTaxes: z.number(),
  passNumber: z.string(),
  effectiveFrom: z.instanceof(dayjs as unknown as typeof Dayjs),
  effectiveTo: z.instanceof(dayjs as unknown as typeof Dayjs),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  vehicleColor: z.string(),
  vehiclePlate: z.string(),
});
