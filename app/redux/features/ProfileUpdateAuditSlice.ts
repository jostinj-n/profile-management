import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileUpdateAudit } from "@/app/types/profileUpdateAudits";
import { RootState } from "../store";

type ProfileAuditTableState = {
	isLoading: boolean;
	records: ProfileUpdateAudit[];
	error: string | null;
	page: number;
	total: number;
}

const initialState: ProfileAuditTableState = {
	isLoading: false,
	error: null,
	records: [],
	page: 0,
	total: 0
}

type ProfileUpdateAuditResponse = {
	items: ProfileUpdateAudit[];
	page: number;
	total: number;
}

export const fetchProfileUpdateAuditsByEmployeeId = createAsyncThunk<ProfileUpdateAuditResponse, string, { state: RootState }>("profileUpdateAudits/fetchByEmployeeId",
  async (employeeId: string, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { pagination } = state.employeeStaffingTransactionTable

      const params = new URLSearchParams()

      params.append('page', (pagination.skip + 1).toString()); // page cannot start at 0, so increment by 1
      params.append('per_page', pagination.limit.toString());

      const response = await fetch(`/api/profileUpdateAudits/${employeeId}?${params.toString()}`)
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

const profileUpdateAuditsSlice = createSlice({
	name: "profileUpdateAudits",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfileUpdateAuditsByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileUpdateAuditsByEmployeeId.fulfilled,
        (state, action: PayloadAction<ProfileUpdateAuditResponse>) => {
          state.isLoading = false;
          state.records = action.payload.items;
          state.page = action.payload.page;
          state.total = action.payload.total;
        },
      )
      .addCase(fetchProfileUpdateAuditsByEmployeeId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch audit records for employee";
      });
	}
})

export const {actions: profileUpdateAuditsActions, reducer: profileUpdateAuditsReducer} = profileUpdateAuditsSlice

export default profileUpdateAuditsSlice.reducer