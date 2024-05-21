import { NextRequest, NextResponse } from "next/server";
import { mockStaffingTransactions } from "@/mocks/staffingTransactions/mockStaffingTransactions";
import { StaffingTransactionAPIResponse } from "@/app/types/staffingTransactions";
import { IS_MOCKING } from "@/mocks/constant";
import { convertKeysToCamelCase } from "../../util";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  const url = new URL(request.url);
  const params = url.searchParams.toString()

  try {
    const data = IS_MOCKING
      ? mockStaffingTransactions
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/stf_view_for_person/${id}?${params}`,
        ).then((response) => response.json() as Promise<StaffingTransactionAPIResponse>);

    if (data) {
      return NextResponse.json(convertKeysToCamelCase(data));
    } else {
      //TODO Response.error  and handle error ?
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.error();
  }
}
