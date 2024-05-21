import { NextRequest, NextResponse } from "next/server";
import { mockContacts } from "@/mocks/contacts/mockContacts";
import { convertKeysToCamelCase } from "../../util";
import { IS_MOCKING } from "@/mocks/constant";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const id = context.params.id;
    let result = null;

    if (IS_MOCKING) {
      result = mockContacts;
    } else {
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/v1/contact-page/${id}`,
      );

      result = await response.json();
    }

    result = convertKeysToCamelCase({
      contactDetails: result.contact_details,
      address: result.address,
      emergencyContacts: result.emergency_contact,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}
