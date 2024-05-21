import { z } from "zod";
import { mockEmployees } from "@/mocks/employees/mockEmployees";
import { EmployeesAPIResponse } from "@/app/types/employee";
import { IS_MOCKING } from "@/mocks/constant";

const employeeUpdateZod = z.object({
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string(),
  preferred_name: z.string(),
  language: z.string(),
});

export type EmployeeUpdateParams = z.infer<typeof employeeUpdateZod>;

export async function GET(request: Request) {
  let url = new URL(request.url);
  let params = url.searchParams.toString()

  try {
    const data = IS_MOCKING
      ? mockEmployees
      : await fetch(
          `${process.env.API_BASE_URL}/api/v1/persons-with-employment?${params}`
        ).then((res) => res.json() as Promise<EmployeesAPIResponse>);

    return Response.json(data);
  } catch (error) {
    return Response.error();
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const result = employeeUpdateZod.safeParse(body);
    if (!result.success) {
      return new Response("Invalid request payload", { status: 422 });
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    return Response.error();
  }
}
