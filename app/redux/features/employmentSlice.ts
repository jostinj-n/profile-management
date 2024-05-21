import { Employment } from "@/app/types/employment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type EmploymentState = {
  isLoading: boolean;
  error: string | null;
  employment: Employment | null;
};

const initialState: EmploymentState = {
  isLoading: false,
  error: null,
  employment: null,
};

export const fetchEmploymentDetails = createAsyncThunk<
  Employment,
  string,
  { state: RootState }
>("employees/fetchEmploymentDetails", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/employment/${employeeId}`);
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

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmploymentDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmploymentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employment = action.payload;
      })
      .addCase(fetchEmploymentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const employeesReducer = employeesSlice.reducer;
export default employeesSlice.reducer;
