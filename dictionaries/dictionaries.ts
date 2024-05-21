import "server-only";
import { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary: any = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = typeof import("@/dictionaries/en.json");
export type NewProfileLabels = Dictionary["workforce"]["newProfile"];
export type EmployeeMenuLabels = Dictionary["employee"]["menu"];
export type EmployeeListPageLabels = Dictionary["employee"]["listPage"];
export type EmployeeFilterLabels = Dictionary["employee"]["filterBar"];
export type EmployeeTableLabels = Dictionary["employee"]["table"];
export type EmployeeProfileLabels = Dictionary["employee"]["profile"];
export type EmployeeProfileCardLabels = Dictionary["employee"]["profileCard"];
export type EmployemntInformationLabels =
  Dictionary["employee"]["employmentInformation"];
export type EmploymentDetailsCardLabels =
  Dictionary["employee"]["employmentDetailsCard"];
export type SpecializedEmploymentDetailsCardLabels =
  Dictionary["employee"]["specializedEmploymentDetailsCard"];
export type EmploymentDocumentCardLabels =
  Dictionary["employee"]["documentDetailCard"];
export type PersonalDetailLabels = Dictionary["employee"]["personalDetails"];
export type CitizenDetailLabels = Dictionary["employee"]["citizenDetails"];
export type BankDetailLabels = Dictionary["employee"]["bankDetails"];
export type ContactDetailLabels = Dictionary["employee"]["contactDetails"];
export type ContactAddressCardLabels =
  Dictionary["employee"]["contactAddressCard"];
export type EmergencyContactDetailLabels =
  Dictionary["employee"]["emergencyContact"];
export type SeniorityDetailLabels = Dictionary["employee"]["seniority"];
export type CompensationLabels = Dictionary["employee"]["compensationPage"];
export type LastUpdateLabels = Dictionary["employee"]["lastUpdate"];
export type ProfileManagementPageLabels =
  Dictionary["employee"]["profileManagementPage"];
export type EmployeeStaffingTransactionTableLabels =
  Dictionary["employee"]["employeeStaffingTransactionsTable"];
export type ProfileUpdateAuditTableLabels =
  Dictionary["employee"]["profileUpdateAuditTable"];

export type FirstPageDictionary =
  Dictionary["workforce"]["newProfile"]["firstPage"];
export type SecondPageDictionnary =
  Dictionary["workforce"]["newProfile"]["secondPage"];
export type ThirdPageDictionnary =
  Dictionary["workforce"]["newProfile"]["thirdPage"];
export type FourthPageDictionnary =
  Dictionary["workforce"]["newProfile"]["fourthPage"];
export type FifthPageDictionnary =
  Dictionary["workforce"]["newProfile"]["fifthPage"];
export type ButtonLabels = Dictionary["button"];
export type ExportEmployeesModalLabels =
  Dictionary["employee"]["exportEmployeesModal"];
export type SixthPageDictionnary =
  Dictionary["workforce"]["newProfile"]["sixthPage"];
export type SeventhPageDictionnary =
  Dictionary["workforce"]["newProfile"]["seventhPage"];
export type EighthPageDictionnary =
  Dictionary["workforce"]["newProfile"]["eighthPage"];
export type ninthPageDictionnary =
  Dictionary["workforce"]["newProfile"]["ninthPage"];
export type zodErrorDictionnary =
  Dictionary["workforce"]["newProfile"]["zodError"];
