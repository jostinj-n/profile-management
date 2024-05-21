import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";

export const mappedPersonProfile = (profile: PersonProfileType) => ({
  person_id: 1,
  employment_detail_id: 1,
  resource_type: profile.resourceType,
  person_pronoun: profile.personalPronoun,
  legal_first_name: profile.personalDetails[0].legalFirstName,
  middle_name: profile.middleName,
  legal_last_name: profile.personalDetails[0].legalLastName,
  preferred_name: profile.preferredName,
  former_legal_first_name: profile.personalDetails[1]?.legalFirstName || "",
  former_legal_last_name: profile.personalDetails[1]?.legalLastName || "",
  gender: profile.gender,
  primary_communication_language: profile.primaryCommunicationLanguage,
  species: profile.species,
  notes: profile.notes,
  date_of_birth: profile.dateOfBirth.format(),
});
