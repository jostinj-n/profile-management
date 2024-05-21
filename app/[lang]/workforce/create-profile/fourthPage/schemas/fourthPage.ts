/*Page containing teh zod schema to validate data from the fields of the form */
import z from "zod";
import {isValidPhoneNumber} from "libphonenumber-js";
import {ensurePlusPrefix} from "@/app/util/createNewProfile/phoneValidation";

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
  phoneType: z.string().min(1, "Phone Type is required"),
  primaryNumber: z.boolean(),
  allowSMS: z.boolean(),
});

const email = z.object({
  email: z.string().email("Email is invalid"),
  primaryEmail: z.boolean(),
  generalCorrespondance: z.boolean(),
});

const address = z.object({
  address: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  city: z.string(),
  sameMailingAddress: z.boolean(),
});

export const fourthPageSchema = z.object({
  phones: z.array(phone),
  emails: z.array(email),
  addresses: z.array(address),
  notes: z.string(),
});
