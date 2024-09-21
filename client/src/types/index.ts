export type CommonResponse<T> = {
  data?: CommonData<T>;
  error?: CommonError;
};

export interface CommonData<T> {
  data: T;
  status: "success";
}

export interface CommonError {
  message: string;
  status: "error";
}

export interface Country {
  code: string;
  userLabel: string;
}
