import { Order } from "../component/table/table-header";

export type RequestParams = {
  global_search?: string;
  user_sorting?: string;
  page?: number;
  per_page?: number;
  perPage?: number;
  order?: Order;
  orderBy?: number;
  total?: number;
  forceUpdate?: number; //use to update cache
};

export const requestParamsInitial: RequestParams = {
  page: 1,
  per_page: 10,
  perPage: 10,
  global_search: undefined,
  user_sorting: undefined,
  order: undefined,
  orderBy: undefined,
};
