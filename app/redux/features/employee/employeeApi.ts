import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmployeeFilterExport } from "@/app/component/employee/ExportButton";
import { handleCsvDownload } from "@/app/util/functionUtils";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/employees/" }),
  endpoints: (builder) => ({
    downloadCsv: builder.query<any, EmployeeFilterExport>({
      query: (params: EmployeeFilterExport) => ({
        url: "download",
        method: "GET",
        params,
        responseHandler: async (response) =>
          handleCsvDownload(response, `employees.csv`),
        cache: "no-cache",
      }),
    }),
  }),
});

export const { useLazyDownloadCsvQuery } = employeeApi;
