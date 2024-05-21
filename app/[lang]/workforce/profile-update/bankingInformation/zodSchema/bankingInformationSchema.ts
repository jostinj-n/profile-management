import z from "zod";

export const bank = z.object({
  personId: z.number(),
  bankingDetailId: z.number(),
  company: z.string().min(1, "Company is required"),
  paymentTypeCode: z.string().min(1, "Payment Type Code is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(2, "Account is required"),
  transitNumber: z.string().min(2, "Routing Number is required"),
  IBAN: z.string().optional(),
  SWIFT: z.string().optional(),
  isActive: z.boolean(),
});
//zod schema validation https://zod.dev/
export const bankingInformationSchema = z.object({
  banks: z.array(bank),
});

export type BankingInformationType = z.infer<typeof bankingInformationSchema>;
