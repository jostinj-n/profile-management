import { NextRequest, NextResponse } from "next/server";
import { convertKeysToCamelCase } from "../../util";

async function buildQueryString(request: Request): Promise<string> {
  let url = new URL(request.url || "");
  return url.searchParams.toString();
}

export async function GET(request: NextRequest): Promise<Response> {
  const params = await buildQueryString(request);
  try {
    const data = await fetch(
      `${process.env.API_BASE_URL}/api/v1/template?${params}`
    ).then((response) => response.json());
    const result = convertKeysToCamelCase(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching and processing groupings data:", error);
    //throw error; // Re-throw the error to propagate it further
    return new Response("Error fetching and processing groupings data", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!request)
      return new Response("Bad Request: Request is null", { status: 400 });

    const data = await request.json();
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/template`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) return NextResponse.json({ success: true });
    return new Response(
      "Error processing POST request: " + response.statusText,
      { status: response.status }
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response("Error processing POST of grouping request", {
      status: 500,
    });
  }
}
