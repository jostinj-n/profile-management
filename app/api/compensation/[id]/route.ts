import { NextRequest, NextResponse } from "next/server";
import { mockCompensationDetails } from "@/mocks/compensation/mockCompensationDetails";
import { convertKeysToCamelCase } from "../../util";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const id = context.params.id;
    let result = null;

    if (IS_MOCKING) {
      result = mockCompensationDetails;
    } else {
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/v1/compensation-page/${id}`,
      );

      result = await response.json();
    }

    result = convertKeysToCamelCase(result);

    return NextResponse.json(result.compensationDetail);
  } catch (error) {
    return NextResponse.error();
  }
}
