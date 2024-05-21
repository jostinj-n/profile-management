import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ReferenceData } from "@/app/types/referenceData";

export type SearchFilter = {
  companies: number[];
  divisions: number[];
  departments: number[];
  search: string;
  union: boolean;
  qualifications: number[];
  locations: number[];
  languages: number[];
  employmentStatus: number[];
  statusClassifications: number[];
  includeProtectedInactiveOnly: boolean;
};

type Pagination = {
  skip: number;
  limit: number;
};

type EmployeeTableState = {
  filters: SearchFilter;
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  referenceData: ReferenceData;
};

export type ReferenceItem = {
  id: number;
  name: string;
  code: string;
  table_name: string;
};

const initialState: EmployeeTableState = {
  filters: {
    companies: [],
    divisions: [],
    departments: [],
    search: "",
    union: false,
    employmentStatus: [],
    locations: [],
    languages: [],
    statusClassifications: [],
    qualifications: [],
    includeProtectedInactiveOnly: false,
  },
  pagination: {
    skip: 0,
    limit: 10,
  },
  referenceData: {
    companies: [],
    locations: [],
    departments: [],
    workStatus: [],
    divisions: [],
    languages: [],
    statusClassifications: [],
    employmentStatus: [],
    qualifications: [],
  },
  isLoading: false,
  error: null,
};

export const fetchReferenceData = createAsyncThunk(
  "employeeTable/fetchReferenceData",
  async (_, { getState }) => {
    try {
      const state: RootState = getState() as RootState;

      // if we already loaded data into the store, don't fetch it again
      if (state.employeeTable.referenceData.companies.length > 0) {
        return;
      }
      const response = await fetch(`/api/referenceData`);
      const responseTwo = await fetch(`/api/referenceData`);

      console.log(
        "referenceData.RESPONSE.OK",
        response.ok,
        response.status,
        response.statusText
      );

      if (responseTwo.ok) {
        const data = await responseTwo.text();
        console.log("referenceData.RESPONSE.TEXT", data);
      }

      if (response.ok) {
        console.log("response.ok");
        const data = await response.json();
        console.log("fetchReferenceData", data);
        return data;
      } else {
        console.error(
          "fetchReferenceData",
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      } else {
        return "Unexpected error occurred";
      }
    }
  }
);

export const employeeTableSlice = createSlice({
  name: "employeeTable",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SearchFilter>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    nextPage: (state, action: PayloadAction<number>) => {
      state.pagination = { ...state.pagination, skip: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferenceData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReferenceData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(
          "employeeTableSlice.fetchReferenceData.fulfilled",
          action.payload
        );
        // state.referenceData = action.payload;
        state.referenceData = {
          companies: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_company"
          ),
          divisions: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_division"
          ),
          locations: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_work_location"
          ),
          departments: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_department"
          ),
          workStatus: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_work_status"
          ),
          languages: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_language"
          ),
          statusClassifications: action.payload.filter(
            (item: ReferenceItem) =>
              item.table_name === "ref_employment_classification"
          ),
          employmentStatus: action.payload.filter(
            (item: ReferenceItem) => item.table_name === "ref_employment_status"
          ),
          qualifications: action.payload.filter(
            (item: ReferenceItem) =>
              item.table_name === "ref_organization_role_type"
          ),
        };
      })
      .addCase(fetchReferenceData.rejected, (state, action) => {
        state.isLoading = false;
        console.log(
          "employeeTableSlice.fetchReferenceData.rejected",
          initialState.referenceData
        );
        state.referenceData = initialState.referenceData;
        state.error = action.payload as string;
      });
  },
});

export const {
  actions: { setFilters, resetFilters, nextPage },
  reducer: employeeTableReducer,
} = employeeTableSlice;
export default employeeTableSlice.reducer;
