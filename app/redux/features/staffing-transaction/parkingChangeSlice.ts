import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ParkingChangeState = {
  activeFormView: boolean;
};

const initialState: ParkingChangeState = {
  activeFormView: false,
};

const parkingChangeSlice = createSlice({
  name: "parkingChange",
  initialState,
  reducers: {
    changeView(state, action: PayloadAction<ParkingChangeState>) {
      state.activeFormView = action.payload.activeFormView;
    },
  },
});

export const { changeView } = parkingChangeSlice.actions;
export default parkingChangeSlice.reducer;
