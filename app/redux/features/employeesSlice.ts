import { Employee } from "@/app/types/employee";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type EmployeesState = {
  isLoading: boolean;
  employees: Employee[];
  error: string | null;
  page: number;
  total: number;
};

const initialState: EmployeesState = {
  isLoading: false,
  error: null,
  employees: [],
  page: 0,
  total: 0,
};

type EmployeesResponse = {
  items: Employee[];
  page: number;
  total: number;
};

export const fetchEmployees = createAsyncThunk<
  EmployeesResponse,
  void,
  { state: RootState }
>("employees/fetchEmployees", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const { filters, pagination } = state.employeeTable;

    const params = new URLSearchParams()
 
    filters.companies.forEach((company) => {
      params.append('company_list', company.toString());
    });
    filters.divisions.forEach((division) => {
      params.append('division_list', division.toString());
    });
    filters.departments.forEach((department) => {
      params.append('department_list', department.toString());
    });
    filters.employmentStatus.forEach((employmentStatus) => {
      params.append('employee_status_list', employmentStatus.toString());
    });
    filters.languages.forEach((language) => {
      params.append('language_list', language.toString());
    });
    filters.locations.forEach((location) => {
      params.append('location_list', location.toString());
    });
    filters.statusClassifications.forEach((statusClassification) => {
      params.append('status_classification_list', statusClassification.toString());
    });

    params.append('text_query_param', filters.search);
    params.append('union', filters.union.toString());
    params.append('includeProtectedInactiveOnly', filters.includeProtectedInactiveOnly.toString());
    params.append('page', (pagination.skip + 1).toString()); // page cannot start at 0, so increment by 1
    params.append('per_page', pagination.limit.toString());

    const response = await fetch(
      `/api/employees?` + params.toString()
    );
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
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload.items;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const employeesReducer = employeesSlice.reducer;
export default employeesSlice.reducer;
