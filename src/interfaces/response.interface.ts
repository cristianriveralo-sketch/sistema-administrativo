export interface IResponseModel<T> {
  message: string;
  error: boolean;
  status: number;
  data: T | null;
}
