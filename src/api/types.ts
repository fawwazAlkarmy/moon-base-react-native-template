export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: {
    [key: string]: string;
  };
  traceId: string;
  code?: string;
  message?: string;
};

export type GenericListResponse<T> = {
  value: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: T;
  };
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
};

export type GenericResponse<T> = {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
};

export type ListPayload = {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  OrderDirection?: string;
};
