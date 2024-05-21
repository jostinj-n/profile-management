import { NextRequest, NextResponse } from "next/server";
import { mockEmploymentDetails } from "@/mocks/employment/mockEmployment";
import { EmploymentAPIResponse } from "@/app/types/employment";
import { IS_MOCKING } from "@/mocks/constant";
import { convertKeysToCamelCase } from "../../util";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    const data = IS_MOCKING
      ? mockEmploymentDetails
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/employment-page/${id}`,
        ).then((response) => response.json() as Promise<EmploymentAPIResponse>);

    if (data) {
      return NextResponse.json(
        convertKeysToCamelCase({
          ...data.employment_header,
          employmentDetails: data.employment_detail,
          associatedIds: data.employee_associated_ids,
        }),
      );
    } else {
      //TODO Response.error  and handle error ?
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.error();
  }
}
