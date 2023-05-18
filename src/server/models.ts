export interface RequestSuccess<T> {
  success: true;
  value: T;
}

export interface RequestError {
  success: false;
  code: string;
  error: Error;
}

export function isRequestSuccess<T>(
  data: RequestSuccess<T> | RequestError
): data is RequestSuccess<T> {
  return data.success === true;
}
