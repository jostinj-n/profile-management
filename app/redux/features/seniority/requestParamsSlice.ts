import { RequestParams } from "@/app/types/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définissez l'état initial
const initialState: RequestParams = {
  page: 1,
  per_page: 10,
  perPage: 10,
};

// Créez un slice Redux pour gérer l'état des paramètres
const requestParamsSlice = createSlice({
  name: "requestParams",
  initialState,
  reducers: {
    setRequestParams: (state, action: PayloadAction<RequestParams>) => {
      // Modifiez l'état en utilisant les paramètres fournis
      const { ...newState } = action.payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
});

// Exportez les actions
export const { setRequestParams } = requestParamsSlice.actions;

// Exportez le reducer
export default requestParamsSlice.reducer;
