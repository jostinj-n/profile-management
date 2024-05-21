import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaffingTransaction } from "@/app/types/staffingTransactions";
import { RootState } from "../store";

type STFTableState = {
	isLoading: boolean;
	transactions: StaffingTransaction[];
	error: string | null;
	page: number;
	total: number;
}

const initialState: STFTableState = {
	isLoading: false,
	error: null,
	transactions: [],
	page: 0,
	total: 0
}

type StaffingTransactionResponse = {
	items: StaffingTransaction[];
	page: number;
	total: number;
}

export const fetchStaffingTransactionsByEmployeeId = createAsyncThunk<StaffingTransactionResponse, string, { state: RootState }>("staffingTransactions/fetchStaffingTransactionsByEmployeeId",
  async (employeeId: string, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { pagination } = state.employeeStaffingTransactionTable

      const params = new URLSearchParams()

      params.append('page', (pagination.skip + 1).toString()); // page cannot start at 0, so increment by 1
      params.append('per_page', pagination.limit.toString());

      const response = await fetch(`/api/staffingTransactions/${employeeId}?${params.toString()}`)
      const data = await response.json()

      return data
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      } else {
        return thunkApi.rejectWithValue("Unexpected error occurred");
      }
    }
  });

const staffingTransactionSlice = createSlice({
	name: "staffingTransactions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStaffingTransactionsByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStaffingTransactionsByEmployeeId.fulfilled,
        (state, action: PayloadAction<StaffingTransactionResponse>) => {
          state.isLoading = false;
          state.transactions = action.payload.items;
          state.page = action.payload.page;
          state.total = action.payload.total;
        },
      )
      .addCase(fetchStaffingTransactionsByEmployeeId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch transactions for employee";
      });
	}
})

export const {actions: staffingTransactionActions, reducer: staffingTransactionReducer} = staffingTransactionSlice

export default staffingTransactionSlice.reducer