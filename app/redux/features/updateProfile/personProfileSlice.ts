import { createSlice } from "@reduxjs/toolkit";

type PersonalDetail = {
  legalFirstName: string;
  legalLastName: string;
};
export type PersonProfileForm = {
  resourceType: string;
  personalPronoun?: string;
  personalDetails: PersonalDetail[];
  middleName?: string;
  preferredName?: string;
  gender: string;
  primaryCommunicationLanguage: string;
  species: string;
  notes: string;
  dateOfBirth?: string;
};

export type PersonProfileState = {
  personProfilePage: PersonProfileForm;
};

const initialState: PersonProfileState = {
  personProfilePage: {
    resourceType: "",
    personalPronoun: "",
    personalDetails: [
      {
        legalFirstName: "",
        legalLastName: "",
      },
    ],
    middleName: "",
    preferredName: "",
    gender: "",
    primaryCommunicationLanguage: "",
    species: "",
    notes: "",
    dateOfBirth: undefined,
  },
};
export const personProfileSlice = createSlice({
  name: "personProfile",
  initialState,
  reducers: {},
});

export default personProfileSlice.reducer;
