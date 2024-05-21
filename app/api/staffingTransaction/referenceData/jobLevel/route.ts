import { ReferenceDataAPIResponse } from "@/app/types/referenceData";
import { NextResponse } from "next/server";
import { IS_MOCKING } from "@/mocks/constant";
import { mockJobLevel } from "@/mocks/referenceData/jobLevel/mockJobLevel";

export async function GET() {
  try {
    const data = IS_MOCKING
      ? mockJobLevel
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/reference_table/single_reference_table/ref_catsa_job_level`,
        ).then(
          (response) => response.json() as Promise<ReferenceDataAPIResponse[]>,
        );

    return NextResponse.json(data);
  } catch (error) {
    return new Response(
      "Error fetching and processing catsa job level TYPE data",
      {
        status: 500,
      },
    );
  }
}
