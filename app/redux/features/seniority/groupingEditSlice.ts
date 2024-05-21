import { GroupingZodType } from "@/app/[lang]/workforce/seniority/create-grouping/types/groupingType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: GroupingZodType = {
  companyId: 0,
  templateName: "",
  divisionId: 0,
  departments: [],
  workLocations: [],
  employmentStatus: [],
  employmentClassifications: [],
  organisationRoles: [],
  organisationRoleSubtypes: [],
  reportTypeId: 0,
  unionizedEmployeeOnly: true,
  includeContactDetails: false,
};

// create Slice
const groupingEditSlice = createSlice({
  name: "groupingEditSelected",
  initialState,
  reducers: {
    setGroupingEdit: (state, action: PayloadAction<GroupingZodType>) => {
      // update state
      return { ...state, ...action.payload };
    },
  },
});

// Export actions
export const { setGroupingEdit } = groupingEditSlice.actions;

// Export reducer
export default groupingEditSlice.reducer;
