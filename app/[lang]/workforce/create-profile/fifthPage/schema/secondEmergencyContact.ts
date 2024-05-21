import { ensurePlusPrefix } from "@/app/util/createNewProfile/phoneValidation";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

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
  phoneType: z.string().min(1, "Phone type is required"),
  primaryNumber: z.boolean(),
  allowSMS: z.boolean(),
});
const email = z.object({
  email: z.string().email("Email is not valid"),
  primaryEmail: z.boolean(),
  generalCorrespondance: z.boolean(),
});
export const secondaryEmergencyContact = z.object({
  relationship: z.string().min(1, "Relationship is required"),
  pronoun: z.string(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  preferredLanguage: z.string(),
  proficiency: z.string(),
  phones: z.array(phone),
  emails: z.array(email),
  notes: z.string().max(1000, "1000 characters max"),
});
