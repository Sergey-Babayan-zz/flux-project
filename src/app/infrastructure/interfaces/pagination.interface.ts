import { IResponse } from './response.interface';

export interface IPagination {
  pageSize: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export interface IResponsePagination<T>  extends IResponse<T>  {
  pagination: IPagination;
}
