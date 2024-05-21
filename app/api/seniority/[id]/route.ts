import { NextRequest, NextResponse } from "next/server";
import { mockSeniorityDetails } from "@/mocks/seniority/mockSeniorityDetails";
import { convertKeysToCamelCase } from "../../util";
import { SeniorityDetailsAPIResponse } from "@/app/types/employee";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const id = context.params.id;

  try {
    const data = IS_MOCKING
      ? mockSeniorityDetails
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/seniority-page/${id}`,
        ).then(
          (response) => response.json() as Promise<SeniorityDetailsAPIResponse>,
        );

    if (data) {
      return NextResponse.json(convertKeysToCamelCase(data.seniority_detail));
    } else {
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.error();
  }
}
