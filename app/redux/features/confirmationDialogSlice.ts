import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConfirmationType = {
  open: boolean;
  title: string;
  content: string;
};
// initail state
const initialState: ConfirmationType = {
  open: false,
  title: "",
  content: "",
};

// create Slice
const confirmationDialogSlice = createSlice({
  name: "confirmationDialog",
  initialState,
  reducers: {
    setConfirmation: (state, action: PayloadAction<ConfirmationType>) => {
      // update state
      return { ...state, ...action.payload };
    },
  },
});

// Export actions
export const { setConfirmation } = confirmationDialogSlice.actions;

// Export reducer
export default confirmationDialogSlice.reducer;
