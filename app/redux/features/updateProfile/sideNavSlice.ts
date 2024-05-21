import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SideNavSlice = {
  activeStep: number;
};

const initialState: SideNavSlice = {
  activeStep: 0,
};
export const sideNavSlice = createSlice({
  name: "sideNavSlice",
  initialState,
  reducers: {
    changeActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
  },
});

export const { changeActiveStep } = sideNavSlice.actions;

export default sideNavSlice.reducer;
