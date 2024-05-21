import { GroupingApiRequest } from "@/app/types/templates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initail state
const initialState: GroupingApiRequest = {
  page: 1,
  per_page: 10,
};

// create Slice
const groupingRequestSlice = createSlice({
  name: "groupingApiRequest",
  initialState,
  reducers: {
    setGroupinRequest: (state, action: PayloadAction<GroupingApiRequest>) => {
      // update state
      return { ...state, ...action.payload };
    },
  },
});

// Export actions
export const { setGroupinRequest } = groupingRequestSlice.actions;

// Export reducer
export default groupingRequestSlice.reducer;
