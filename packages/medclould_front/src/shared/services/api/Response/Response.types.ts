export interface IDataResponse<T> {
  total: number;
  per_page: number;
  offset: number;
  to: number;
  last_page: number;
  current_page: number;
  from: number;
  data: T[];
}

export interface IResponsePagination<T> {
  data: IDataResponse<T>;
}
