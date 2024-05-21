import { GroupingReportApiRequest } from "@/app/types/seniority";
import { handleCsvDownload } from "@/app/util/functionUtils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupingReportApi = createApi({
  reducerPath: "groupingReportApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seniority/report" }),
  endpoints: (builder) => ({
    getSeniority: builder.query({
      query: (params: GroupingReportApiRequest) => ({
        url: "/",
        method: "GET",
        params, // Pass the parameters here
      }),
    }),
    downloadCsv: builder.query<any, GroupingReportApiRequest>({
      query: (params: GroupingReportApiRequest) => ({
        url: "download",
        method: "GET",
        params, // Pass the parameters here
        responseHandler: async (response) =>
          handleCsvDownload(
            response,
            `${params.template_name}_seniority_report.csv`,
          ),
        cache: "no-cache",
      }),
    }),
  }),
});

export const { useGetSeniorityQuery, useLazyDownloadCsvQuery } =
  groupingReportApi;
