import { createSlice } from "@reduxjs/toolkit";

type Pagination = {
  skip: number;
  limit: number;
};

type EmployeeStaffingTransactionTableState = {
  pagination: Pagination;
};

const initialState: EmployeeStaffingTransactionTableState = {
  pagination: {
    skip: 0,
    limit: 10,
  }
};

export const employeeStaffingTransactionTableSlice = createSlice({
  name: "employeeStaffingTransactionTable",
  initialState,
  reducers: {
    resetPage: state => {
      state.pagination = { ...state.pagination, skip: 0 };
    },
    changePage: (state, action) => {
      state.pagination = { ...state.pagination, skip: action.payload };
    },
    nextPage: state => {
      state.pagination = { ...state.pagination, skip: state.pagination.skip + 1 };
    },
    prevPage: state => {
      state.pagination = { ...state.pagination, skip: state.pagination.skip - 1 || 0 };
    }
  }
});

export const {
  actions: { changePage, nextPage, prevPage, resetPage },
  reducer: employeeTableReducer,
} = employeeStaffingTransactionTableSlice;
export default employeeStaffingTransactionTableSlice.reducer;
