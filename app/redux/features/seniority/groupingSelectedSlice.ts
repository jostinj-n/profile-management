import { GroupingRow } from "@/app/types/templates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initail state
const initialState: GroupingRow = {
  templateId: 0,
  templateName: "",
  companyId: 0,
  companyName: "",
  divisionId: 0,
  divisionName: "",
  departments: [],
  workLocations: [],
  reportTypeId: 0,
  reportTypeName: "",
  employmentclassifications: [],
  organisationroles: [],
  organisationrolesubtypes: [],
  employmentstatus: [],
  unionizedEmployeeOnly: false,
  includeContactDetails: false,
};

// create Slice
const groupingSelectedSlice = createSlice({
  name: "groupingSelected",
  initialState,
  reducers: {
    setGroupingSelected: (state, action: PayloadAction<GroupingRow>) => {
      // update state
      return { ...state, ...action.payload };
    },
  },
});

// Export actions
export const { setGroupingSelected } = groupingSelectedSlice.actions;

// Export reducer
export default groupingSelectedSlice.reducer;
