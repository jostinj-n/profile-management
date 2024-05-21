import z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { ensurePlusPrefix } from "@/app/util/createNewProfile/phoneValidation";

const phone = z.object({
  phoneNumber: z.string().refine(
    (data) => {
      // Use isValidPhoneNumber from libphonenumber-js for validation
      const phoneNumber = ensurePlusPrefix(data);
      return isValidPhoneNumber(phoneNumber);
    },
    {
      message: "Invalid phone number",
    },
  ),
  personalDeviceTye: z.string().min(1, "Phone Type is required"),
  primaryNumber: z.boolean(),
  SmsAllowed: z.boolean(),
});

const email = z.object({
  personalEmailAddress: z.string().email("Email is invalid"),
  primaryEmailAddress: z.boolean(),
  emailGeneralCorrespondence: z.boolean(),
});

export const contactDetailsSchema = z.object({
  personId: z.number(),
  phones: z.array(phone),
  emails: z.array(email),
  residentialAddress: z.string().min(2, "Residential Address is required"),
  mailingAddress: z.string(),
  sameMailingAddress: z.boolean(),
  emergencyContacts: z.array(
    z.object({
      primaryContact: z.boolean(),
      relationship: z.string().min(1, "Required"),
      pronoun: z.string(),
      firstName: z
        .string()
        .min(2, "First Name is required 2 character minimum"),
      lastName: z.string().min(2, "Last Name is required 2 character minimum"),
      preferredLanguage: z.string().min(1, "Required"),
      proficiency: z.string().min(1, "Required"),
      phones: z.array(phone),
      email: z.string().email("Email is not valid"),
      notes: z.string().max(1000, "1000 characters max"),
    }),
  ),
});

export type ContactDetailsType = z.infer<typeof contactDetailsSchema>;
