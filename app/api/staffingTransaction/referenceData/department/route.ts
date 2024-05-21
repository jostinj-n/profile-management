import { ReferenceDataAPIResponse } from "@/app/types/referenceData";
import { NextResponse } from "next/server";
import { IS_MOCKING } from "@/mocks/constant";
import { mockDepartmentData } from "@/mocks/referenceData/department/mockDepartmentData";

export async function GET() {
  try {
    const data = IS_MOCKING
      ? mockDepartmentData
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/reference_table/single_reference_table/ref_department`,
        ).then(
          (response) => response.json() as Promise<ReferenceDataAPIResponse[]>,
        );

    return NextResponse.json(data);
  } catch (error) {
    return new Response("Error fetching and processing Department TYPE data", {
      status: 500,
    });
  }
}
