export interface SearchFilter {
  companies: string[],
  search: string,
  union: boolean,
  workStatus: string[],
  locations: string[],
}

export interface SearchCompany {
  name: string,
  id: string,
}

export interface WorkStatusType {
  label: string,
  id: string,
}

export interface LocationFilter {
  name: string,
  id: string,
}