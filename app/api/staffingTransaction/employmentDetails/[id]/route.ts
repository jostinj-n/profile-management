import { NextRequest, NextResponse } from "next/server";
import { IS_MOCKING } from "@/mocks/constant";
import { EmploymentDetailsApiResponse } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { mockEmploymentDetailsTransaction } from "@/mocks/employmentDetails/mockEmploymentDetails";
import { convertKeysToCamelCase } from "@/app/api/util";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const data = IS_MOCKING
      ? mockEmploymentDetailsTransaction
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/employment_details/${id}`,
        ).then((resp) => resp.json() as Promise<EmploymentDetailsApiResponse>);
    if (data) {
      return NextResponse.json(convertKeysToCamelCase(data));
    } else {
      return NextResponse.json(data);
    }
  } catch (error) {
    return Response.error();
  }
}
