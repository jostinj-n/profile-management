import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ContactDetails,
  EmergencyContact,
  EmployeeContactAddress,
  EmployeeContactDetails,
} from "@/app/types/employee";
import { RootState } from "../store";

type EmployeeState = {
  isLoading: boolean;
  error: string | null;
  contactDetails: ContactDetails;
};

const initialState: EmployeeState = {
  isLoading: false,
  error: null,
  contactDetails: {
    contactDetails: {} as EmployeeContactDetails,
    address: {} as EmployeeContactAddress,
    emergencyContacts: [] as EmergencyContact[],
  },
};

export const fetchContactDetailsById = createAsyncThunk<
  ContactDetails,
  string,
  { state: RootState }
>("employee/fetchContactDetailsById", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/contacts/${employeeId}`);
    const data = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    } else {
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
});

const contactDetailSlice = createSlice({
  name: "contactDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchContactDetailsById.fulfilled,
        (state, action: PayloadAction<ContactDetails>) => {
          state.isLoading = false;
          state.contactDetails = action.payload;
        },
      )
      .addCase(fetchContactDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch employee contact details";
      });
  },
});

export const { actions: contactDetailActions, reducer: contactDetailReducer } =
  contactDetailSlice;
export default contactDetailSlice.reducer;
