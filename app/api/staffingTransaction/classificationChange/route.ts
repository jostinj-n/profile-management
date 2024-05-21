import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!request) {
      return new Response("Bad Request: Request is null", { status: 400 });
    }

    const data = await request.json();
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/create_classification_change`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const responseMsg = await response.json();
    return NextResponse.json(responseMsg, { status: response.status });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response("Error processing POST of leave absence request", {
      status: 500,
    });
  }
}
