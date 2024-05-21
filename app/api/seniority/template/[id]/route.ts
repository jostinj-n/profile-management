import { convertKeysToCamelCase } from "@/app/api/util";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: number } },
): Promise<Response> {
  try {
    const id = context.params.id;
    if (!id) return new Response("Bad Request: ID is null", { status: 400 });
    const data = await fetch(
      `${process.env.API_BASE_URL}/api/v1/template/${id}`,
    ).then((response) => response.json());

    const result = convertKeysToCamelCase(data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching and processing groupings data:", error);
    return new Response("Error processing GET of grouping request", {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: number } }
) {
  try {
    const id = context.params.id;
    if (!request)
      return new Response("Bad Request: Request is null", { status: 400 });
    if (!id) return new Response("Bad Request: ID is null", { status: 400 });

    const data = await request.json();
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/template/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) return NextResponse.json({ success: true });
    return new Response(
      "Error processing PUT of grouping request: " + response.statusText,
      { status: response.status }
    );
  } catch (error) {
    console.error("Error processing PUT of grouping request:", error);
    return new Response("Error processing PUT of grouping request", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: number } }
) {
  try {
    const id = context.params.id;
    if (!request)
      return new Response("Bad Request: Request is null", { status: 400 });
    if (!id) return new Response("Bad Request: ID is null", { status: 400 });

    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/template/template/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) return NextResponse.json({ success: true });
    return new Response(
      "Error processing DELETE  grouping request: " + response.statusText,
      { status: response.status }
    );
  } catch (error) {
    console.error("Error processing DELETE  grouping request:", error);
    return new Response("Error processing DELETE  grouping request", {
      status: 500,
    });
  }
}
