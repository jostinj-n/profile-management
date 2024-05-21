import z from "zod";

const bank = z.object({
  company: z.string().min(1, "Company is required"),
  paymentTypeCode: z.string().min(1, "Payment Type Code is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(2, "Account is required"),
  accountType: z.string().min(2, "Account Type is required"),
  routingNumber: z.string().min(2, "Routing Number is required"),
  IBAN: z.string().min(2, "min 2"),
  SWIFT: z.string().min(2, "min 2"),
  active: z.boolean(),
});
//zod schema validation https://zod.dev/
export const thirdPageSchema = z.object({
  banks: z.array(bank),
});
