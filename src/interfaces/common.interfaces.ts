export interface IHttpError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
