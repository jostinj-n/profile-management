import { createSlice } from "@reduxjs/toolkit";

export type PhoneType = {
  phoneNumber: string;
  personalDeviceTye: string;
  primaryNumber: boolean;
  SmsAllowed: boolean;
};

export type EmailType = {
  personalEmailAddress: string;
  primaryEmailAddress: boolean;
  emailGeneralCorrespondence: boolean;
};

export type ContactDetailsForm = {
  phones: PhoneType[];
  emails: EmailType[];
  residentialAddress: string;
  mailingAddress: string;
  sameMailingAddress: boolean;
  notes: string;
};

export type ContactDetailsState = {
  contactDetailsPage: ContactDetailsForm;
};

const initialState: ContactDetailsState = {
  contactDetailsPage: {
    phones: [
      {
        phoneNumber: "",
        personalDeviceTye: "",
        primaryNumber: false,
        SmsAllowed: false,
      },
    ],
    emails: [
      {
        personalEmailAddress: "",
        primaryEmailAddress: false,
        emailGeneralCorrespondence: false,
      },
    ],
    residentialAddress: "",
    mailingAddress: "",
    sameMailingAddress: false,
    notes: "",
  },
};
export const contactDetailsSlice = createSlice({
  name: "contactDetails",
  initialState,
  reducers: {},
});

export default contactDetailsSlice.reducer;
