import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BankingInformationType } from "@/app/[lang]/workforce/profile-update/bankingInformation/zodSchema/bankingInformationSchema";
import { Bank } from "@/app/types/bank";
import { BanksApi } from "@/app/redux/features/updateProfile/bankingInformationSlice";

export const banksAPI = createApi({
  reducerPath: "banksAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/personalDetails" }),
  endpoints: (builder) => ({
    bankInformationUpdateProfile: builder.query<BankingInformationType, string>(
      {
        query: (employeeID: string) => `/${employeeID}`,
        transformResponse: (rawResponse: BanksApi) => {
          console.log("****************BANKS");
          return {
            banks: rawResponse.bankingDetail.map((bank: Bank) => ({
              personId: bank.personId,
              //TODO ADD THE REAL BANKING DETAIL ID
              bankingDetailId: 1,
              company: bank.company,
              paymentTypeCode: bank.paymentTypeCode,
              bankName: bank.bankName,
              accountNumber: bank.accountNumber,
              transitNumber: bank.transitNumber,
              IBAN: bank.IBAN,
              SWIFT: bank.SWIFT,
              isActive: bank.isActive,
            })),
          };
        },
      },
    ),
  }),
});

export const { useLazyBankInformationUpdateProfileQuery } = banksAPI;
