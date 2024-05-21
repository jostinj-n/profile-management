import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EmployeeBankingInformation,
  EmployeeDocument,
  EmployeePersonalDetails,
} from "@/app/types/employee";
import { RootState } from "../store";

type PersonalDetail = {
  personal: EmployeePersonalDetails;
  banking: EmployeeBankingInformation[];
  documents: EmployeeDocument[];
};

type PersonalDetailState = {
  isLoading: boolean;
  error: string | null;
  personalDetails: PersonalDetail;
};

const initialState: PersonalDetailState = {
  isLoading: true,
  error: null,
  personalDetails: {
    personal: {} as EmployeePersonalDetails,
    banking: [] as EmployeeBankingInformation[],
    documents: [] as EmployeeDocument[],
  },
};

export const fetchPersonalDetailsById = createAsyncThunk<
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
      documents: data.idRecords,
    };
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    } else {
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
});

const personalDetailSlice = createSlice({
  name: "personalDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPersonalDetailsById.fulfilled,
        (state, action: PayloadAction<PersonalDetail>) => {
          state.isLoading = false;
          state.personalDetails = action.payload;
        },
      )
      .addCase(fetchPersonalDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch employee personal details";
      });
  },
});

export const {
  actions: personalDetailActions,
  reducer: personalDetailReducer,
} = personalDetailSlice;
export default personalDetailSlice.reducer;
