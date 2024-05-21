import { NextRequest, NextResponse } from "next/server";
import { mockEmployeeProfile } from "@/mocks/employeeProfile/mockEmployeeProfile";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  if (IS_MOCKING) {
    return Response.json(mockEmployeeProfile);
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/profile-page/${id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
