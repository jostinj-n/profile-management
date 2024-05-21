import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ExportModalState = {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  file: string | null;
};

const initialState: ExportModalState = {
  isOpen: false,
  isLoading: false,
  error: null,
  file: null,
};

export const exportCSV = createAsyncThunk<string, void, { state: RootState }>(
  "exportEmployeesModal/exportCSV",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { filters } = state.employeeTable;

      const params = { ...filters };

      //TODO replace with route.ts
      const response = await fetch(
        `/api/v1/employment_detail/persons-with-employment/download?` +
          new URLSearchParams(params as any),
      );
      const data = await response.text();

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      } else {
        return thunkApi.rejectWithValue("Unexpected error occurred");
      }
    }
  },
);

export const exportEmployeesModalSlice = createSlice({
  name: "exportEmployeesModal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = initialState.isOpen;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.file = initialState.file;
    },
    openModal: (state) => {
      console.log("exportEmployeesModalSlice openModal");
      state.isOpen = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportCSV.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportCSV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.file = action.payload;
      })
      .addCase(exportCSV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { closeModal, openModal } = exportEmployeesModalSlice.actions;
export default exportEmployeesModalSlice.reducer;
