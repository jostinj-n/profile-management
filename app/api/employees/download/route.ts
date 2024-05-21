import { NextRequest } from "next/server";

async function buildQueryString(request: Request): Promise<string> {
  let url = new URL(request.url || "");
  return url.searchParams.toString();
}
export async function GET(request: NextRequest): Promise<Response> {
  const params = await buildQueryString(request);
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/employment/export-employment-csv?${params}`
    );
    console.log(
      `${process.env.API_BASE_URL}/api/v1/employment/export-employment-csv?${params}`
    );
    if (!response.ok) {
      return new Response("Failed to fetch data", {
        status: 500,
      });
    }
    const blob = await response.blob();

    return new Response(blob);
  } catch (error) {
    console.error("Error fetching and download seniority data:", error);
    return new Response("Error to download seniority data", {
      status: 500,
    });
  }
}
