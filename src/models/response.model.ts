import { IResponseModel } from "../interfaces/response.interface";

export class ResponseModel<T> implements IResponseModel<T> {
  message: string;
  error: boolean;
  status: number;
  data: T | null;

  constructor(message: string, error: boolean, status: number, data: T | null) {
    this.message = message;
    this.error = error;
    this.status = status;
    this.data = data;
  }
}
