import { ensurePlusPrefix } from "@/app/util/createNewProfile/phoneValidation";
import dayjs, { Dayjs } from "dayjs";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const primaryWorkLocation = z.object({
  primaryWorkLocation: z.string().min(1, "Primary Work Location is required"),
  primaryWorkLocationCode: z.string().min(1, "Primary Work Code is required"),
});
export const sixthPageSchema = z.object({
  company: z.string().min(1, "Company is required"),
  division: z.string().min(1, "Division is required"),
  department: z.string().min(1, "Department is required"),
  primaryWorkLocations: z.array(primaryWorkLocation),
  // If other work locations can be added, you would need to define an array of objects with the appropriate structure
  organizationRole: z.string(),
  organizationalRoleSubtype: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  statusClassification: z.string().min(1, "Status classification is required"),
  jobHireDate: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  firstDayOfWork: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  unionizedPosition: z.boolean(), // Checkbox represented as boolean
  probationPeriod: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  originalHireDate: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  terminationDate: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  lastDayOnRole: z.instanceof(dayjs as unknown as typeof Dayjs), // Use z.date() if you need a Date object
  workPhone: z.string().refine(
    (data) => {
      // Use isValidPhoneNumber from libphonenumber-js for validation
      const phoneNumber = ensurePlusPrefix(data);
      return isValidPhoneNumber(phoneNumber);
    },
    {
      message: "Invalid phone number",
    },
  ),
  phoneType: z.string(), // If additional phones can be added, you would need to define an array of objects with the appropriate structure
  workEmail: z.string().email(),
});
