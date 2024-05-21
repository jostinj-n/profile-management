import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Relationship } from "@/app/[lang]/workforce/create-profile/thirdPage/types/thirdPageType";

type PersonalDetail = {
  firstName: string;
  lastName: string;
};
type FirstPage = {
  employeeNumber: string;
  ressourceType: string;
  effectiveDate?: string;
  personalDetails: PersonalDetail[];
  middleName: string;
  preferredName: string;
  gender: string;
  dateOfBirth?: string;
  primaryCommunicationLanguage: string;
  pronoun: string;
  species: string;
  notes: string;
};
type GovernmentID = {
  typeOfId: string;
  issuedByAgency: string;
  issuedValue: string;
  expiryDate?: string; // Assuming you want to store the date as a string
};

type SecondPage = {
  citizenCountry: string;
  citizenIssuingAgency: string;
  status: string;
  statusIdType: string;
  idValue: string;
  effectiveFrom?: string; // Assuming you want to store the date as a string
  effectiveTo?: string; // Assuming you want to store the date as a string
  governmentIDs: GovernmentID[];
  binaryGender: string;
  taxIdType: string;
  taxIdValue: string;
  taxIssuingAgency: string;
  expiryDateTax?: string;
  notes: string;
};
type Bank = {
  company: string;
  paymentTypeCode: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  IBAN: string;
  SWIFT: string;
  active: boolean;
};
type ThirdPage = {
  banks: Bank[];
};

export type PhoneType = {
  phoneNumber: string;
  phoneType: string;
  primaryNumber: boolean;
  allowSMS: boolean;
};

export type EmailType = {
  email: string;
  primaryEmail: boolean;
  generalCorrespondance: boolean;
};
type AddressType = {
  address: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  sameMailingAddress: boolean;
};
type FourthPage = {
  phones: PhoneType[];
  emails: EmailType[];
  addresses: AddressType[];
  notes: string;
};
type EmergencyContact = {
  primaryContact: boolean;
  relationship: string;
  pronoun: string;
  firstName: string;
  lastName: string;
  preferredLanguage: string;
  proficiency: string;
  phones: PhoneType[];
  emails: EmailType[];
  notes: string;
};
type FifthPage = Record<string, EmergencyContact>;

type EmergencyContactSection = {
  emergencyContacts: EmergencyContact[];
};
type PrimaryWorkLocation = {
  primaryWorkLocation: string;
  primaryWorkLocationCode: string;
};
type SixthPage = {
  company: string;
  division: string;
  department: string;
  primaryWorkLocations: PrimaryWorkLocation[];
  // For other work locations, define a type that represents the structure of each work location if needed
  organizationRole: string;
  organizationalRoleSubtype: string;
  jobTitle: string;
  employmentStatus: string;
  statusClassification: string;
  jobHireDate?: string; // Change to Date if you want to store actual Date objects
  firstDayOfWork?: string; // Change to Date if you want to store actual Date objects
  unionizedPosition: boolean; // Checkbox represented as boolean
  probationPeriod?: string; // Change to Date if you want to store actual Date objects
  originalHireDate?: string; // Change to Date if you want to store actual Date objects
  terminationDate?: string;
  lastDayOnRole?: string;
  workPhone: string;
  phoneType: string;
  // For additional phones, define a type that represents the structure of each phone if needed
  workEmail: string;
};

type Language = {
  name: string;
};
type ID = {
  otherEmployeeAssociatedIDType: string;
  otherEmployeeAssociatedIDValue: string;
  expiryDate?: string;
};
type SeventhPage = {
  IDs: ID[];
  associatedIDs: string; // This should be an array of strings if it represents multiple associated ID types
  languages: Language[]; // Represents multiple languages
  CATSAJobLevel: string;
  isBilingual: boolean;
  activeUnionSteward: boolean;
  isActiveHSCommitteeMember: boolean;
  employmentNotes?: string; // Optional string
  notes: string;
};
type EighthPage = {
  vacationEntitlementDate?: string;
  workLocationStartDate?: string;
  statusClassificationStartDate?: string; // Use z.date() if you want to enforce Date objects
  workLocationTiebreakerValue: number | undefined;
  statusClassificationTiebreakerValue: number | undefined;
  note: string; // Assuming there can be multiple languages added
};
type NinthPage = {
  issuedPassType: string;
  passNumber: string;
  reimbursementType: string;
  reimbursementAmount: number | undefined;
  reimbursementPercentage: number | undefined;
  reimbursementDollar: string;
  issuingAgency: string;
  monthlyRateWithTaxes: number | undefined;
  effectiveFrom?: string;
  effectiveTo?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlate: string;
};

type ReferenceData = {
  data: [];
  loading: boolean;
  error: string | undefined;
};
type ThirdPageNewContact = {
  relationship: Relationship;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  secondaryPhoneNumber?: string;
  secondaryEmail?: string;
};
export type NewProfileState = {
  activeStep: number;
  firstPage: FirstPage;
  secondPage: SecondPage;
  thirdPage: ThirdPage;
  fourthPage: FourthPage;
  fifthPage: FifthPage;
  sixthPage: SixthPage;
  seventhPage: SeventhPage;
  eighthPage: EighthPage;
  ninthPage: NinthPage;
  thirdPageNewContact?: ThirdPageNewContact;
  referenceTableData: ReferenceData;
  emergencyContact: EmergencyContactSection;
};

export const initialEmergencyContact = {
  primaryContact: false,
  relationship: "",
  pronoun: "",
  firstName: "",
  lastName: "",
  preferredLanguage: "",
  proficiency: "",
  phones: [
    {
      phoneNumber: "",
      phoneType: "",
      primaryNumber: false,
      allowSMS: false,
    },
  ],
  emails: [
    {
      email: "",
      primaryEmail: false,
      generalCorrespondance: false,
    },
  ],
  notes: "",
};
const initialState: NewProfileState = {
  activeStep: 0,
  referenceTableData: {
    data: [],
    loading: false,
    error: undefined,
  },
  firstPage: {
    employeeNumber: "",
    ressourceType: "",
    effectiveDate: undefined,
    personalDetails: [
      {
        firstName: "",
        lastName: "",
      },
    ],
    middleName: "",
    preferredName: "",
    gender: "",
    dateOfBirth: undefined,
    primaryCommunicationLanguage: "",
    pronoun: "",
    species: "",
    notes: "",
  },
  secondPage: {
    citizenCountry: "",
    citizenIssuingAgency: "",
    status: "",
    statusIdType: "",
    idValue: "",
    effectiveFrom: undefined, // Assuming you want to store the date as a string
    effectiveTo: undefined, // Assuming you want to store the date as a string
    governmentIDs: [
      {
        typeOfId: "",
        issuedByAgency: "",
        issuedValue: "",
        expiryDate: undefined,
      },
    ],
    binaryGender: "",
    taxIdType: "",
    taxIdValue: "",
    taxIssuingAgency: "",
    expiryDateTax: undefined, // Assuming you want to store the date as a string
    notes: "",
  },
  thirdPage: {
    banks: [
      {
        company: "",
        paymentTypeCode: "",
        bankName: "",
        accountNumber: "",
        accountType: "",
        routingNumber: "",
        IBAN: "",
        SWIFT: "",
        active: false,
      },
    ],
  },
  fourthPage: {
    phones: [
      {
        phoneNumber: "",
        phoneType: "",
        primaryNumber: false,
        allowSMS: false,
      },
    ],
    emails: [
      {
        email: "",
        primaryEmail: false,
        generalCorrespondance: false,
      },
    ],
    addresses: [
      {
        address: "",
        state: "",
        country: "",
        postalCode: "",
        city: "",
        sameMailingAddress: false,
      },
    ],
    notes: "",
  },
  fifthPage: { "0": initialEmergencyContact },

  sixthPage: {
    company: "",
    division: "",
    department: "",
    primaryWorkLocations: [
      {
        primaryWorkLocation: "",
        primaryWorkLocationCode: "",
      },
    ],
    organizationRole: "",
    organizationalRoleSubtype: "",
    jobTitle: "",
    employmentStatus: "",
    statusClassification: "",
    jobHireDate: undefined,
    firstDayOfWork: undefined,
    unionizedPosition: false,
    probationPeriod: undefined,
    originalHireDate: undefined,
    terminationDate: undefined,
    lastDayOnRole: undefined,
    workPhone: "",
    phoneType: "",
    workEmail: "",
  },
  seventhPage: {
    IDs: [
      {
        otherEmployeeAssociatedIDType: "",
        otherEmployeeAssociatedIDValue: "",
        expiryDate: undefined, // or new Date().toISOString() if using Date objects
      },
    ],
    associatedIDs: "", // This would hold multiple strings, each representing an associated ID
    languages: [
      {
        name: "",
      },
    ], // This would hold multiple languages as strings
    CATSAJobLevel: "",
    isBilingual: false,
    activeUnionSteward: false,
    isActiveHSCommitteeMember: false,
    employmentNotes: "", // This is optional; it can be omitted or set to an empty string or any string value
    notes: "notes",
  },
  eighthPage: {
    vacationEntitlementDate: undefined,
    workLocationStartDate: undefined,
    statusClassificationStartDate: undefined, // Use z.date() if you want to enforce Date objects
    workLocationTiebreakerValue: undefined,
    statusClassificationTiebreakerValue: undefined,
    note: "", // Assuming there can be multiple languages added
  },
  ninthPage: {
    issuedPassType: "",
    passNumber: "",
    reimbursementType: "",
    reimbursementAmount: undefined,
    reimbursementPercentage: undefined,
    reimbursementDollar: "",
    issuingAgency: "",
    monthlyRateWithTaxes: undefined,
    effectiveFrom: undefined,
    effectiveTo: undefined,
    vehicleMake: "",
    vehicleModel: "",
    vehicleColor: "",
    vehiclePlate: "",
  },
  emergencyContact: {
    emergencyContacts: [
      {
        primaryContact: false,
        relationship: "",
        pronoun: "",
        firstName: "",
        lastName: "",
        preferredLanguage: "",
        proficiency: "",
        phones: [
          {
            phoneNumber: "",
            phoneType: "",
            primaryNumber: false,
            allowSMS: false,
          },
        ],
        emails: [
          {
            email: "",
            primaryEmail: false,
            generalCorrespondance: false,
          },
        ],
        notes: "",
      },
    ],
  },
};

type PagePayload =
  | { page: "firstPage"; data: FirstPage }
  | { page: "secondPage"; data: SecondPage }
  | { page: "thirdPage"; data: ThirdPage }
  | { page: "fourthPage"; data: FourthPage }
  | { page: "fifthPage"; data: FifthPage }
  | { page: "sixthPage"; data: SixthPage }
  | { page: "seventhPage"; data: SeventhPage }
  | { page: "eighthPage"; data: EighthPage }
  | { page: "ninthPage"; data: NinthPage };

export const newProfileSlice = createSlice({
  name: "newProfile",
  initialState,
  reducers: {
    continueToSecondStep: (state, action: PayloadAction<FirstPage>) => {
      state.firstPage = action.payload;
      state.activeStep = 1;
    },
    backToFirstStep: (state) => {
      // state.secondPage = undefined;
      state.activeStep = 0;
    },
    continueToThirdStep: (state, action: PayloadAction<SecondPage>) => {
      state.secondPage = action.payload;
      state.activeStep = 2;
    },
    continueToFourthStep: (state, action: PayloadAction<ThirdPage>) => {
      state.thirdPage = action.payload;
      state.activeStep = 3;
    },
    continueToFifththStep: (state, action: PayloadAction<FourthPage>) => {
      state.fourthPage = action.payload;
      state.activeStep = 4;
    },
    continueToSixththStep: (state, action: PayloadAction<FifthPage>) => {
      state.fifthPage = action.payload;
      state.activeStep = 5;
    },
    continueToSeventhStep: (state, action: PayloadAction<SixthPage>) => {
      state.sixthPage = action.payload;
      state.activeStep = 6;
    },
    continueToEighthStep: (state, action: PayloadAction<SeventhPage>) => {
      state.seventhPage = action.payload;
      state.activeStep = 7;
    },
    continueToNinthStep: (state, action: PayloadAction<EighthPage>) => {
      state.eighthPage = action.payload;
      state.activeStep = 8;
    },
    submitCreateNewProfile: (state, action: PayloadAction<NinthPage>) => {
      state.ninthPage = action.payload;
      state.activeStep = 8;

      fetch("/api/newProfile", {
        method: "POST", // Request method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(state), // Convert the data to JSON string
      });
    },
    backOneStep: (state, action: PayloadAction<PagePayload>) => {
      console.log("ACTIVE", state.activeStep);
      switch (action.payload.page) {
        case "firstPage":
          state.firstPage = action.payload.data as FirstPage;
          break;
        case "secondPage":
          state.secondPage = action.payload.data as SecondPage;
          break;
        case "thirdPage":
          state.thirdPage = action.payload.data as ThirdPage;
          break;
        case "fourthPage":
          state.fourthPage = action.payload.data as FourthPage;
          break;
        case "fifthPage":
          state.fifthPage = action.payload.data as FifthPage;
          break;
        case "sixthPage":
          state.sixthPage = action.payload.data as SixthPage;
          break;
        case "seventhPage":
          state.seventhPage = action.payload.data as SeventhPage;
          break;
        case "eighthPage":
          state.eighthPage = action.payload.data as EighthPage;
          break;
        case "ninthPage":
          state.ninthPage = action.payload.data as NinthPage;
          break;
        // ... other cases
      }
      state.activeStep = state.activeStep - 1;
    },
    changeActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
  },
});
export const {
  continueToSecondStep,
  backToFirstStep,
  continueToThirdStep,
  continueToFourthStep,
  continueToFifththStep,
  continueToSixththStep,
  continueToSeventhStep,
  continueToEighthStep,
  continueToNinthStep,
  submitCreateNewProfile,
  backOneStep,
  changeActiveStep,
} = newProfileSlice.actions;

export default newProfileSlice.reducer;
