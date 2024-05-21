import { NextRequest, NextResponse } from "next/server";
import { mockEmployeeProfile } from "@/mocks/employeeProfile/mockEmployeeProfile";
import { IS_MOCKING } from "@/mocks/constant";
import { mockPersonalDetails } from "@/mocks/personalDetails/mockPersonalDetails";
import {
  EmployeePersonalDetailsAPI,
  EmployeeProfileAPIResponse,
} from "@/app/types/employee";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;

  try {
    const [personProfilePage, personalDetailsData] = await Promise.all([
      IS_MOCKING
        ? mockEmployeeProfile
        : fetch(`${process.env.API_BASE_URL}/api/v1/profile-page/${id}`).then(
            (response) =>
              response.json() as Promise<EmployeeProfileAPIResponse>,
          ),
      IS_MOCKING
        ? mockPersonalDetails
        : fetch(
            `${process.env.API_BASE_URL}/api/v1/personal-detail-page/${id}`,
          ).then(
            (response) =>
              response.json() as Promise<EmployeePersonalDetailsAPI>,
          ),
    ]);

    const personalDetails = [
      {
        legalFirstName: personProfilePage.header.first_name,
        legalLastName: personProfilePage.header.last_name,
      },
    ];

    if (
      personProfilePage.user_profile.former_first_name != undefined &&
      personProfilePage.user_profile.former_first_name != ""
    ) {
      personalDetails.push({
        legalFirstName: personProfilePage.user_profile.former_first_name,
        legalLastName: personProfilePage.user_profile.former_last_name,
      });
    }

    const result = {
      gender: personProfilePage.user_profile.gender,
      species: personProfilePage.user_profile.species,
      notes: personProfilePage.user_profile.notes,
      dateOfBirth: personalDetailsData.personal_detail.date_of_birth,
      personalDetails,
      resourceType: personProfilePage.user_profile.resource_type,
      personalPronoun: personProfilePage.header.personal_pronoun,
      middleName: personProfilePage.header.middle_name,
      preferredName: personProfilePage.header.preferred_name,
      primaryCommunicationLanguage:
        personProfilePage.header.primary_language_of_communication,
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}
