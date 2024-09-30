export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type CommonResponse<T, E = CommonError> = {
  data?: CommonData<T>;
  error?: E;
};

export interface CommonData<T> {
  data: T;
  status: "success";
}

export interface CommonError {
  message: string;
  status: "error";
}

export interface SelectItemType {
  code: string;
  userLabel: string;
}

export type PostNewOptionError = CommonError & { field: "code" | "userLabel" };
