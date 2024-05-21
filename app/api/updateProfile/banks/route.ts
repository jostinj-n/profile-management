import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/v1/update_bank_details`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(data),
    },
  );

  if (!response || !response.ok) {
    if (response.status === 406) {
      return NextResponse.json(
        { message: "No change in banks" },
        { status: response.status },
      );
    }
    if (response.status === 422) {
      return NextResponse.json(
        { message: "One or more fields are missing or incorrect" },
        { status: response.status },
      );
    }
  }
  if (response.status === 404) {
    return NextResponse.json(
      {
        message: "Reference data check failed and not found in the database.",
      },
      { status: response.status },
    );
  }
  return NextResponse.json({}, { status: response.status });
}
