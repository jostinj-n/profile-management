import { IS_MOCKING } from "@/mocks/constant";
import { mockEmergencyContacts } from "@/mocks/emergencyContacts/mockEmergencyContacts";

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  if (IS_MOCKING) {
    return Response.json(mockEmergencyContacts);
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/contact_detail/contact-page/${id}`,
    );
    const data = await response.json();
    return Response.json(data.emergency_contact);
  } catch (error) {
    return Response.error();
  }
}
