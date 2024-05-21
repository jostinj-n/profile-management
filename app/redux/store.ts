import { configureStore } from "@reduxjs/toolkit";
import newProfileReducer from "./features/newProfileSlice";
import newProfileDataReducer from "./features/newProfileReferenceData";
import stfReducer from "./features/staffing-transaction/stfSlice";
import paginationReducer from "./features/paginationSlice";

import employeeTableReducer from "./features/employeeTableSlice";
import exportEmployeesModalReducer from "./features/exportEmployeesModalSlice";
import employeesReducer from "./features/employeesSlice";
import employeeReducer from "./features/employeeSlice";
import personalDetailReducer from "./features/personalDetailSlice";
import contactDetailReducer from "./features/contactDetailSlice";
import employeeSeniorityReducer from "./features/employeeSenioritySlice";
import { groupingApi } from "./features/seniority/templateApi";
import { filtersApi } from "./features/seniority/filtersApi";
import { groupingReportApi } from "./features/seniority/groupingReportApi";
import requestParamsReducer from "./features/seniority/requestParamsSlice";
import groupingRequestReducer from "./features/seniority/groupingRequestSlice";
import groupingSelectedReducer from "./features/seniority/groupingSelectedSlice";
import groupingEditReducer from "./features/seniority/groupingEditSlice";

import staffingTransactionReducer from "./features/StaffingTransactionSlice";
import employeeStaffingTransactionTableReducer from "./features/EmployeeStaffingTransactionTableSlice";

import profileUpdateAuditReducer from "./features/ProfileUpdateAuditSlice";
import profileUpdateAuditTableReducer from "./features/profileUpdateAuditTableSlice";

import employmentReducer from "./features/employmentSlice";
import employeeCompensationReducer from "./features/employeeCompensationSlice";

import confirmationDialogReducer from "./features/confirmationDialogSlice";

import { referenceDataApi } from "./features/staffing-transaction/referenceDataApi";
import { leaveAbsenceApi } from "./features/staffing-transaction/leaveAbsenceApi";

import sideNavSliceReducer from "@/app/redux/features/updateProfile/sideNavSlice";
import personProfileReducer from "@/app/redux/features/updateProfile/personProfileSlice";
import parkingChangeReducer from "@/app/redux/features/staffing-transaction/parkingChangeSlice";

import bankingInformationReducer, {
  banksValuesReducer,
  updatedBanksReducer,
} from "@/app/redux/features/updateProfile/bankingInformationSlice";
import { resignationApi } from "./features/staffing-transaction/resignationApi";
import { terminationApi } from "./features/staffing-transaction/terminationApi";
import { employmentDetailsApi } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { classificationChangeApi } from "@/app/redux/features/staffing-transaction/classificationChangeApi";
import { otherApi } from "./features/staffing-transaction/otherApi";
import { employeeCompensationApi } from "./features/staffing-transaction/employeeCompensationApi";
import { parkingChangeApi } from "./features/staffing-transaction/parkingChangeApi";

import contactDetailsReducer from "@/app/redux/features/updateProfile/contactDetailsSlice";
import { employeeAPI } from "@/app/redux/features/updateProfile/api/employeeAPI";
import { banksAPI } from "@/app/redux/features/updateProfile/api/bankInformationAPI";
import { refDataProfileUpdateAPI } from "@/app/redux/features/updateProfile/api/referenceDataAPI";
import { promotionApi } from "./features/staffing-transaction/promotionApi";
import { demotionApi } from "./features/staffing-transaction/demotionApi";
import { transferApi } from "./features/staffing-transaction/transferApi";
import { salaryRevisionApi } from "./features/staffing-transaction/salaryRevisionApi";

import { contactDetailsAPI } from "@/app/redux/features/updateProfile/api/contactDetailsAPI";
import { idRecordsAPI } from "@/app/redux/features/updateProfile/api/IdRecordsAPI";
import { updateProfileAPI } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { seniorityAPI } from "@/app/redux/features/updateProfile/api/seniorityAPI";

export const store = configureStore({
  reducer: {
    newProfile: newProfileReducer,
    newProfileRefData: newProfileDataReducer,
    profileUpdateSideNav: sideNavSliceReducer,
    personProfile: personProfileReducer,
    contactDetailUpdateProfile: contactDetailsReducer,
    personalInformationProfileUpdate: bankingInformationReducer,
    bankingInformation: bankingInformationReducer,
    updatedBanks: updatedBanksReducer,
    banksValues: banksValuesReducer,
    seniorityPagination: paginationReducer,
    employeeTable: employeeTableReducer,
    exportEmployeesModal: exportEmployeesModalReducer,
    employees: employeesReducer,
    employee: employeeReducer,
    employment: employmentReducer,
    personalDetail: personalDetailReducer,
    contactDetail: contactDetailReducer,
    employeeSeniority: employeeSeniorityReducer,
    employeeStaffingTransaction: staffingTransactionReducer,
    employeeStaffingTransactionTable: employeeStaffingTransactionTableReducer,
    profileUpdateAudit: profileUpdateAuditReducer,
    profileUpdateAuditTable: profileUpdateAuditTableReducer,
    parkingChange: parkingChangeReducer,
    compensationDetail: employeeCompensationReducer,
    requestParams: requestParamsReducer,
    groupingRequest: groupingRequestReducer,
    groupingSelected: groupingSelectedReducer,
    groupingEdit: groupingEditReducer,
    confirmationDialog: confirmationDialogReducer,
    staffingTransaction: stfReducer,
    [groupingApi.reducerPath]: groupingApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    [groupingReportApi.reducerPath]: groupingReportApi.reducer,
    [employmentDetailsApi.reducerPath]: employmentDetailsApi.reducer,
    [referenceDataApi.reducerPath]: referenceDataApi.reducer,
    [leaveAbsenceApi.reducerPath]: leaveAbsenceApi.reducer,
    [classificationChangeApi.reducerPath]: classificationChangeApi.reducer,
    [resignationApi.reducerPath]: resignationApi.reducer,
    [terminationApi.reducerPath]: terminationApi.reducer,
    [otherApi.reducerPath]: otherApi.reducer,
    [employeeCompensationApi.reducerPath]: employeeCompensationApi.reducer,
    [parkingChangeApi.reducerPath]: parkingChangeApi.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [banksAPI.reducerPath]: banksAPI.reducer,
    [updateProfileAPI.reducerPath]: updateProfileAPI.reducer,
    [refDataProfileUpdateAPI.reducerPath]: refDataProfileUpdateAPI.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
    [demotionApi.reducerPath]: demotionApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
    [salaryRevisionApi.reducerPath]: salaryRevisionApi.reducer,
    [contactDetailsAPI.reducerPath]: contactDetailsAPI.reducer,
    [idRecordsAPI.reducerPath]: idRecordsAPI.reducer,
    [seniorityAPI.reducerPath]: seniorityAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(groupingApi.middleware)
      .concat(filtersApi.middleware)
      .concat(groupingReportApi.middleware)
      .concat(referenceDataApi.middleware)
      .concat(leaveAbsenceApi.middleware)
      .concat(classificationChangeApi.middleware)
      .concat(resignationApi.middleware)
      .concat(employmentDetailsApi.middleware)
      .concat(terminationApi.middleware)
      .concat(otherApi.middleware)
      .concat(employeeCompensationApi.middleware)
      .concat(parkingChangeApi.middleware)
      .concat(employeeAPI.middleware)
      .concat(banksAPI.middleware)
      .concat(refDataProfileUpdateAPI.middleware)
      .concat(promotionApi.middleware)
      .concat(demotionApi.middleware)
      .concat(transferApi.middleware)
      .concat(salaryRevisionApi.middleware)
      .concat(contactDetailsAPI.middleware)
      .concat(idRecordsAPI.middleware)
      .concat(updateProfileAPI.middleware)
      .concat(contactDetailsAPI.middleware)
      .concat(seniorityAPI.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
