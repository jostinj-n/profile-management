import { mockReferenceData } from "@/mocks/referenceData/mockReferenceData";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET() {
  if (IS_MOCKING) {
    return Response.json(mockReferenceData);
  }

  try {
    const url = `${process.env.API_BASE_URL}/api/v1/reference_table`;
    const response = await fetch(url, { next: { revalidate: 1 } });

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.error();
  }
}
