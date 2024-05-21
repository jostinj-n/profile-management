import { ReferenceItem } from "@/app/redux/features/employeeTableSlice";
import { NextRequest, NextResponse } from "next/server";

async function callApiByName(nameData: string): Promise<FilterResponse[]> {
  const data = await fetch(
    `${process.env.API_BASE_URL}/api/v1/reference_table`,
  ).then((response) => response.json() as Promise<ApiResponse>);

  switch (nameData) {
    case "company": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_company")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "division": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_division")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "department": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_department")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "worklocation": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_work_location")
        .map((item) => ({
          id: item.id,
          name: item.name,
          code: item.code,
        }));
      return result;
    }
    case "status_classification": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_employment_classification")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "organization_role": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_organization_role")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "organization_role_subtype": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_organization_role_subtype")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "employment_status": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_employment_status")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "seniority_date_type": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_seniority_date_type")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_id_issuing_agency": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_id_issuing_agency")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_reimbursement_type": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_reimbursement_type")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_parking_pass_type": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_parking_pass_type")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));

      return result;
    }
    case "ref_parking_issuing_agency": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_parking_issuing_agency")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_vehicle_color": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_vehicle_color")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_vehicle_make": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_vehicle_make")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_gender": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_gender")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "ref_catsa_job_level": {
      const result: FilterResponse[] = (data as ReferenceItem[])
        .filter((item) => item.table_name === "ref_catsa_job_level")
        .map((item) => ({
          id: item.id,
          name: item.name,
        }));
      return result;
    }
    case "transfer_type": {
      const result = [
        { id: 1, name: "Company", code: "Company" },
        { id: 2, name: "Service", code: "Service" },
      ];
      return result;
    }
    default:
      throw new Error("Type d'API non reconnu");
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { name: string } }
) {
  const name = context.params.name;

  try {
    const data = await callApiByName(name);
    return NextResponse.json(data);
  } catch (error) {
    return new Response("Error fetching and processing filter  data", {
      status: 500,
    });
  }
}
type ApiResponse =
  | CompanyApiResponse[]
  | DivisionApiResponse[]
  | DepartmentApiResponse[]
  | WorklocationApiResponse[]
  | StatusClassificationApiResponse[]
  | OrganisationRoleApiResponse[]
  | OrganisationRoleSubtypeApiResponse[]
  | EmploymentStatusApiResponse[]
  | SeniorityDateTypeApiResponse[]
  | ReferenceItem[];

type CompanyApiResponse = {
  ref_company_id: number;
  name: string;
};

type DivisionApiResponse = {
  ref_division_id: number;
  name: string;
};

type DepartmentApiResponse = {
  ref_department_id: number;
  name: string;
};
type WorklocationApiResponse = {
  ref_work_location_id: number;
  name: string;
};
type StatusClassificationApiResponse = {
  ref_employment_classification_id: number;
  name: string;
};
type OrganisationRoleApiResponse = {
  ref_organization_role_id: number;
  name: string;
};
type OrganisationRoleSubtypeApiResponse = {
  ref_organization_role_subtype_id: number;
  name: string;
};
type EmploymentStatusApiResponse = {
  ref_employment_status_id: number;
  name: string;
};
type SeniorityDateTypeApiResponse = {
  ref_seniority_date_type_id: number;
  name: string;
};

export type FilterResponse = {
  id: number;
  name: string;
  code?: string;
};
