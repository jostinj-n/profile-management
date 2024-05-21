import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ReferenceData = {
  data: [];
  loading: boolean;
  error: string | undefined;
};

export type ReferenceTableData = {
  referenceTableData: ReferenceData;
};

const initialState: ReferenceTableData = {
  referenceTableData: {
    data: [],
    loading: false,
    error: undefined,
  },
};

//TODO I'd like to phase this out in favor of what Bruno's made with useGetDataQuery
export const fetchReferenceTableData = createAsyncThunk(
  "referenceData/fetch",
  async () => {
    const response = await fetch("/api/referenceData");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
);

export const newProfileRefSlice = createSlice({
  name: "newProfileRefSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferenceTableData.pending, (state) => {
        state.referenceTableData.loading = true;
        state.referenceTableData.error = undefined;
      })
      .addCase(fetchReferenceTableData.fulfilled, (state, action) => {
        state.referenceTableData.loading = false;
        state.referenceTableData.data = action.payload;
      })
      .addCase(fetchReferenceTableData.rejected, (state, action) => {
        state.referenceTableData.loading = false;
        state.referenceTableData.error = action.error.message;
      });
  },
});

export default newProfileRefSlice.reducer;
