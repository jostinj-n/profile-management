export interface GenericResponse<Type> {
  items: Type;
  page: number;
  rowsPerPage: number;
  total: number;
  pages: number;
  limit: number;
}
