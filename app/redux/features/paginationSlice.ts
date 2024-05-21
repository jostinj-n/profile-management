import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaginationState = {
  page: number;
  rowPerPage: number;
  total: number;
  pages: number;
};

const initialPagination: PaginationState = {
  page: 0,
  rowPerPage: 0,
  total: 0,
  pages: 0,
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState: initialPagination,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});
export const { changePage } = paginationSlice.actions;
export default paginationSlice.reducer;

export const emptyRowsOfTable = (state: PaginationState) => {
  return state.page > 0
    ? Math.max(0, (1 + state.page) * state.rowPerPage - state.total)
    : 0;
};
