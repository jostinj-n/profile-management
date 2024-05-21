import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SeniorityDetails } from "@/app/types/employee";
import { RootState } from "../store";

type SeniorityState = {
  isLoading: boolean;
  error: string | null;
  seniority: SeniorityDetails[];
};

const initialState: SeniorityState = {
  isLoading: true,
  error: null,
  seniority: [] as SeniorityDetails[],
};

export const fetchSeniorityById = createAsyncThunk<
  SeniorityDetails[],
  string,
  { state: RootState }
>("employee/fetchSeniorityById", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/seniority/${employeeId}`);
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

const employeeSenioritySlice = createSlice({
  name: "employeeSeniority",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeniorityById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSeniorityById.fulfilled,
        (state, action: PayloadAction<SeniorityDetails[]>) => {
          state.seniority = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchSeniorityById.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to fetch employee seniority";
        state.isLoading = false;
      });
  },
});

export const {
  actions: employeeSeniorityActions,
  reducer: employeeSeniorityReducer,
} = employeeSenioritySlice;
export default employeeSenioritySlice.reducer;
