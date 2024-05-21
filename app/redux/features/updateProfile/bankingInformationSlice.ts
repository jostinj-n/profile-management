import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bank } from "@/app/types/bank";
import { RootState } from "@/app/redux/store";
import { EmployeePersonalDetails } from "@/app/types/employee";

type PersonalDetail = {
  personal: EmployeePersonalDetails;
  banking: Bank[];
};

type BankingInformationState = {
  isLoading: boolean;
  error: string | null;
  personalDetails: PersonalDetail;
};

export type BanksApi = {
  bankingDetail: Bank[];
};
export type BanksPayload = {
  banks: Bank[];
};

const bankValues: BanksPayload = {
  banks: {} as Bank[],
};
const updatedPersonalDetails: BanksPayload = {
  banks: {} as Bank[],
};
const initialState: BankingInformationState = {
  isLoading: true,
  error: null,
  personalDetails: {
    personal: {} as EmployeePersonalDetails,
    banking: [] as Bank[],
  },
};

const bankValuesSlice = createSlice({
  name: "bankValues",
  initialState: bankValues, // Your initial state for another slice
  reducers: {
    setBankValues(state, action: PayloadAction<BanksPayload>) {
      state.banks = action.payload.banks;
    },
  },
});

const updatedBanksSlice = createSlice({
  name: "updatedBanks",
  initialState: updatedPersonalDetails, // Your initial state for another slice
  reducers: {
    setBanksPayload(state, action: PayloadAction<BanksPayload>) {
      state.banks = action.payload.banks;
      console.log(JSON.stringify(state), "STATE");
      fetch("/api/updateProfile", {
        method: "PUT", // Request method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(state), // Convert the data to JSON string
      });
    },
  },
});

export const fetchPersonalDetailsByIdUpdate = createAsyncThunk<
  PersonalDetail,
  string,
  { state: RootState }
>("employee/fetchPersonalDetailsById", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/personalDetails/${employeeId}`);
    const data = await response.json();
    return {
      personal: data.personalDetail,
      banking: data.bankingDetail,
    };
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    } else {
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
});

const bankingDetailSlice = createSlice({
  name: "bankingInformation",
  initialState,
  reducers: {
    changeInitialState(state, action: PayloadAction<any>) {
      state.personalDetails.banking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetailsByIdUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPersonalDetailsByIdUpdate.fulfilled,
        (state, action: PayloadAction<PersonalDetail>) => {
          state.isLoading = false;
          state.personalDetails = action.payload;
          console.log(action.payload);
        },
      )
      .addCase(fetchPersonalDetailsByIdUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch employee personal details";
      });
  },
});

export const {
  actions: { changeInitialState },
  reducer: personaDetailReducer,
} = bankingDetailSlice;
export const {
  actions: { setBanksPayload },
  reducer: updatedBanksReducer,
} = updatedBanksSlice;
export const {
  actions: { setBankValues },
  reducer: banksValuesReducer,
} = bankValuesSlice;
export default bankingDetailSlice.reducer;
export { updatedBanksSlice };
export { bankValuesSlice };
