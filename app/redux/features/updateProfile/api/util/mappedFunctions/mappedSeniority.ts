import { SenioritySchemaType } from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";

export const mappedSeniority = (data: SenioritySchemaType) => ({
  seniority: data.seniority.map((records) => ({
    seniority_id: 1,
    person_id: records.personId,
    seniority_on: records.seniorityDate.format("YYYY-MM-DD"),
    seniority_date_type_tiebreaker: records.seniorityDateTypeTiebreaker,
    suppress_seniority_flag: records.suppressSeniorityFlag,
    notes: records.notes,
  })),
});
