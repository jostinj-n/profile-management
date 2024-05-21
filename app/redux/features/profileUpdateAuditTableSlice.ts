import { createSlice } from "@reduxjs/toolkit";

type Pagination = {
  skip: number;
  limit: number;
};

type ProfileUpdateAuditTableState = {
  pagination: Pagination;
};

const initialState: ProfileUpdateAuditTableState = {
  pagination: {
    skip: 0,
    limit: 10,
  }
};

export const profileUpdateAuditTableSlice = createSlice({
  name: "profileUpdateAuditTable",
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
  reducer: profileUpdateAuditTableReducer,
} = profileUpdateAuditTableSlice;
export default profileUpdateAuditTableSlice.reducer;
