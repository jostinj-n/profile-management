import { GenericResponse } from "@/app/types/generic-response";
import {
  GroupingReportApiResponse,
  GroupingReportRow,
} from "@/app/types/seniority";
import { NextResponse } from "next/server";

async function buildQueryString(request: Request): Promise<string> {
  let url = new URL(request.url || "");
  return url.searchParams.toString();
}

export async function GET(request: Request): Promise<Response> {
  let params = await buildQueryString(request);
  try {
    const data = await fetch(
      `${process.env.API_BASE_URL}/api/v1/seniority/seniority?${params}`
    ).then(
      (response) =>
        response.json() as Promise<GenericResponse<GroupingReportApiResponse[]>>
    );

    const result: GenericResponse<GroupingReportRow[]> = {
      total: data.total,
      page: data.page,
      pages: data.pages,
      limit: data.limit,
      rowsPerPage: data.limit, // TO delete
      items: data.items.map((groupingReport: GroupingReportApiResponse) => ({
        employeeNumber: groupingReport.employee_number,
        lms: groupingReport.lms,
        fullName: groupingReport.full_name,
        seniorityRank: groupingReport.seniority_rank,
        statusClassification: groupingReport.status_classification,
        wlsDate: groupingReport.wls_date,
        phoneNumber: groupingReport.phone_number,
        emailAdress: groupingReport.email_adress,
        employmentDetailId: groupingReport.employment_detail_id,
      })),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching and processing seniority data:", error);
    return new Response("Error fetching and processing seniority data", {
      status: 500,
    });
  }
}
