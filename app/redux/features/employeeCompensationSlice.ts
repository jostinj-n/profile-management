import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeCompensation } from "@/app/types/employee";
import { RootState } from "../store";

type CompensationState = {
  isLoading: boolean;
  error: string | null;
  compensation: EmployeeCompensation;
};

const initialState: CompensationState = {
  isLoading: true,
  error: null,
  compensation: {} as EmployeeCompensation,
};

export const fetchCompensationById = createAsyncThunk<
  EmployeeCompensation,
  string,
  { state: RootState }
>("employee/fetchCompensationById", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/compensation/${employeeId}`);
    const data = await response.json();

    return data[0];
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    } else {
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
});

const employeeCompensationSlice = createSlice({
  name: "employeeCompensation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompensationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCompensationById.fulfilled,
        (state, action: PayloadAction<EmployeeCompensation>) => {
          state.compensation = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchCompensationById.rejected, (state, action) => {
        state.error =
          action.error.message ||
          "Failed to fetch employee compensation details";
        state.isLoading = false;
      });
  },
});

export const {
  actions: employeeSeniorityActions,
  reducer: employeeCompensationReducer,
} = employeeCompensationSlice;
export default employeeCompensationSlice.reducer;
