import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@/app/types/employee";
import { RootState } from "../store";

type EmployeeState = {
  isLoading: boolean;
  error: string | null;
  employee: Employee;
};

const initialState: EmployeeState = {
  isLoading: false,
  error: null,
  employee: {} as Employee,
};

export const fetchEmployeeById = createAsyncThunk<
  Employee,
  string,
  { state: RootState }
>("employee/fetchById", async (employeeId: string, thunkApi) => {
  try {
    const response = await fetch(`/api/employees/${employeeId}`);
    const data = await response.json();
    return {
      ...data.user_profile,
      ...data.header,
      location: data.header.work_location_name,
      company: data.header.company_name,
      division: data.header.division_name,
    };
  } catch (e) {
    if (e instanceof Error) {
      return thunkApi.rejectWithValue(e.message);
    } else {
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.isLoading = false;
          state.employee = action.payload;
        },
      )
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch employee";
      });
  },
});

export const { actions: employeeActions, reducer: employeeReducer } =
  employeeSlice;
export default employeeSlice.reducer;
