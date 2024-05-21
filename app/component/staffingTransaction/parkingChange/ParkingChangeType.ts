import { EmployeeCompensation } from "@/app/types/employee";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

function isTwoDecimalFloat(value: number): boolean {
  const decimalPart = (value % 1).toFixed(2).substring(2);
  return decimalPart.length === 2;
}

export const getParkingChangeSchema = () => {
  return z.object({
    parking_pass_type: z.string().optional(),
    reimbursement_type: z.string().optional(),

    reimbursement_value: z.preprocess(
      (a) => parseFloat(a as string),
      z.number().refine((value) => isTwoDecimalFloat(value))
    ),
    parking_issuing_agency: z.string().optional(),
    pass_number: z.string().optional(),
    pass_monthly_cost: z.preprocess(
      (a) => parseFloat(a as string),
      z.number().refine((value) => isTwoDecimalFloat(value))
    ),
    effective_from: z.instanceof(dayjs as unknown as typeof Dayjs),
    effective_to: z.instanceof(dayjs as unknown as typeof Dayjs),
    vehicle_make: z.string().optional(),
    vehicle_model: z.string().optional(),
    vehicle_color: z.string().optional(),
    vehicle_licence_plate: z.string().optional(),
    explanation: z.string().optional(),
  });
};

export type ParkingChangeType = z.infer<
  ReturnType<typeof getParkingChangeSchema>
>;
export type ParkingChangeState = Omit<
  ParkingChangeType,
  "effective_from" | "effective_to"
> & {
  effective_to: string;
  effective_from: string;
};
export type ParkingChangeCreate = ParkingChangeState & {
  person_id: number;
  employment_detail_id: number;
  effective_date: string;
};

export const parkingChangeInitialValue = {
  parking_pass_type: "",
  reimbursement_type: "",
  reimbursement_value: 0,
  parking_issuing_agency: "",
  pass_number: "",
  pass_monthly_cost: 0,
  effective_from: dayjs().format(),
  effective_to: dayjs().format(),
  vehicle_make: "",
  vehicle_model: "",
  vehicle_color: "",
  vehicle_licence_plate: "",
  explanation: "",
};

export const employeeCompensationToParkingChange = (
  employeeCompensation: EmployeeCompensation
): ParkingChangeState => {
  return {
    parking_pass_type: employeeCompensation.issuedPassType || "",
    reimbursement_type: employeeCompensation.reimbursementType || "",
    reimbursement_value:
      parseInt(employeeCompensation.reimbursementPercentage) || 0,
    parking_issuing_agency: employeeCompensation.issuingAgency || "",
    pass_number: employeeCompensation.passNumber || "",
    pass_monthly_cost: parseInt(employeeCompensation.passMonthlyCost) || 0,
    effective_from: dayjs(employeeCompensation.effectiveFrom).format(),
    effective_to: dayjs(employeeCompensation.effectiveTo).format(),
    vehicle_make: employeeCompensation.vehicleMake || "",
    vehicle_model: employeeCompensation.vehicleModel || "",
    vehicle_color: employeeCompensation.vehicleColor || "",
    vehicle_licence_plate: employeeCompensation.licensePlate || "",
  };
};
