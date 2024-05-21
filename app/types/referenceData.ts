export type DropdownOption = {
  id: number;
  name: string;
  code?: string;
};

export type ReferenceData = {
  companies: DropdownOption[];
  locations: DropdownOption[];
  workStatus: DropdownOption[];
  divisions: DropdownOption[];
  departments: DropdownOption[];
  languages: DropdownOption[];
  employmentStatus: DropdownOption[];
  statusClassifications: DropdownOption[];
  qualifications: DropdownOption[];
};

export type ReferenceDataAPIResponse = {
  id: number;
  name: string;
  code: string;
  table_name: string;
}[];
