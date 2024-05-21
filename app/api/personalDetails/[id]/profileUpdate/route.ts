import { NextRequest, NextResponse } from "next/server";
import { mockPersonalDetailsProfileUpdate } from "@/mocks/personalDetails/mockPersonalDetails";
import { EmployeePersonalDetailsProfileUpdate } from "@/app/types/employee";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    const data = IS_MOCKING
      ? mockPersonalDetailsProfileUpdate
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/personal-detail-page/${id}`,
        ).then(
          (response) =>
            response.json() as Promise<EmployeePersonalDetailsProfileUpdate>,
        );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
